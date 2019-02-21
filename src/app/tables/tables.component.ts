import {Component, OnInit, AfterContentInit,  ViewEncapsulation} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {TableComponent} from './table/table.component';
import {ConfirmComponent} from '../components/confirm/confirm.component';
import {MatDialog} from '@angular/material';
import {TranslatePipe} from '../services/translate/translate.pipe';
import {TableServices} from '../models/table/table.services';
import {Table} from '../models/table/table';
import {AngularFireDatabase} from '@angular/fire/database';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [TranslatePipe, TableServices]
})
export class TablesComponent implements OnInit, AfterContentInit {
  public openedTableDetail = false;
  public table: any;
  public locations: any;
  private _DbRef;

  constructor(private spinner: NgxSpinnerService, public dialog: MatDialog, private translater: TranslatePipe, private tableServ: TableServices, private db: AngularFireDatabase) {
    /* Set database ref */
    this._DbRef = this.db.database.ref('/table');
  }

  ngOnInit() {
    this.spinner.show();
    this.tableServ.get().then(data => {
      this.table = data;
      this.locations = this.tableServ.getLocation(this.table);
    });

    /* On updated table */
    this._DbRef.on('child_changed', (child) => {
      const selectedIndex = this.table.findIndex(a => a.$key === child.key);
      this.table[selectedIndex] = child.val();
      this.locations = this.tableServ.getLocation(this.table);
    });
  }
  ngAfterContentInit() { this.spinner.hide(); }

  onTableDetail(table: Table): void {

    if (this.openedTableDetail) { return; }
    this.openedTableDetail = true;
    const dialogRef = this.dialog.open(TableComponent, {
      width: '450px',
      data: table || null,
    });

    dialogRef.afterClosed().subscribe(() => this.openedTableDetail = false);
  }

  Confirm(): void {
    this.openedTableDetail = true;
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '450px',
      data: {message: this.translater.transform('sure_message'), title: this.translater.transform('sure_message_title')}
    });

    dialogRef.componentInstance.onSelect.subscribe(result => {
      console.log(result);
    });

    dialogRef.afterClosed().subscribe(() => { dialogRef.componentInstance.onSelect.unsubscribe();  this.openedTableDetail = false; });
  }

}
