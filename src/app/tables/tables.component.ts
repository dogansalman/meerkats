import {Component, OnInit, AfterContentInit,  ViewEncapsulation} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {TableComponent} from './table/table.component';
import {ConfirmComponent} from '../components/confirm/confirm.component';
import {MatDialog} from '@angular/material';
import {TranslatePipe} from '../services/translate/translate.pipe';
import {TableServices} from '../models/table/table.services';
import {Table} from '../models/table/table';

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

  constructor(private spinner: NgxSpinnerService, public dialog: MatDialog, private translater: TranslatePipe, private tableServ: TableServices) { }

  ngOnInit() {
    this.spinner.show();
    this.tableServ.get().then(data => {
      this.table = data;
      this.locations = this.table.map(item => item.location).filter((value, index, self) => self.indexOf(value) === index);
      // console.log(this.table, this.locations);
    });
  }
  ngAfterContentInit() { this.spinner.hide(); }

  onTableDetail(table: Table): void {
    if (this.openedTableDetail) { return; }
    this.openedTableDetail = true;
    const dialogRef = this.dialog.open(TableComponent, {
      width: '450px',
      data: table || null
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
