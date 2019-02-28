import {AfterContentInit, ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {TableComponent} from './table/table.component';
import {ConfirmComponent} from '../components/confirm/confirm.component';
import {MatDialog} from '@angular/material';
import {TranslatePipe} from '../services/translate/translate.pipe';
import {TableServices} from '../models/table/table.services';
import {Table} from '../models/table/table';
import {AngularFireDatabase} from '@angular/fire/database';
import {MatSnackBar} from '@angular/material';

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

  constructor(private spinner: NgxSpinnerService, public dialog: MatDialog,
              private snack: MatSnackBar,
              private translater: TranslatePipe,
              private tableServ: TableServices,
              private db: AngularFireDatabase) {
    /* Set database ref */
    this._DbRef = this.db.database.ref('/table');
  }

  ngOnInit() {
    /* Show loader */
    this.spinner.show();

    /* Get all tables from cloud */
    this.tableServ.get().then(data => {
      /* Set table array globally */
      this.table = data;
      /* Get tables location in tables array */
      this.locations = this.tableServ.getLocation(this.table);
    });

    /* On updated data */
    this._DbRef.on('child_changed', (child) => {
      /* Get index changed table */
      const selectedIndex = this.table.findIndex(a => a.$key === child.key);
      /* Assign table object to changed tables value */
      Object.assign(this.table[selectedIndex], child.val());
      /* Reload location */
      this.locations = this.tableServ.getLocation(this.table);
    });

    /* On removed data */
    this._DbRef.on('child_removed', (child) => {
      const removedIndex = this.table.findIndex(a => a.$key === child.key);
      this.table.splice(removedIndex , 1);
      // for dom updating on delete table
      this.table = this.table.filter((e, i) => removedIndex !== i);
      this.locations = this.tableServ.getLocation(this.table);

    });
  }

  /* Loader hiding after init loaded. */
  ngAfterContentInit() { this.spinner.hide(); }

  /* On table detail modal */
  onTableDetail(table: Table): void {

    if (this.openedTableDetail) { return; }
    this.openedTableDetail = true;
    const dialogRef = this.dialog.open(TableComponent, {
      width: '450px',
      data: table || null,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.openedTableDetail = false;
      console.log(result);
      if (!result || result === 'undefined' || result == null) { return; }
      if (result === true) {
        this.snack.open(this.translater.transform('successful'), this.translater.transform('ok_button'), {duration: 3000, panelClass: 'snack_success'});
        return;
      }
      this.snack.open(this.translater.transform('unsuccessful'), this.translater.transform('ok_button'), {duration: 3000, panelClass: 'snack_error'});
    });
  }

  /* Table delete confirm*/
  onDelete(data: Table): void {
    this.openedTableDetail = true;
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '450px',
      data: {message: this.translater.transform('sure_message'), title: this.translater.transform('sure_message_title')}
    });

    dialogRef.componentInstance.onSelect.subscribe(result => {
      if (!result) { return; }
      this.tableServ.delete(data).then(() => {
        this.snack.open(this.translater.transform('successful'), this.translater.transform('ok_button'), {duration: 3000, panelClass: 'snack_success'});
      }).catch(err => {
        this.snack.open(this.translater.transform('unsuccessful'), this.translater.transform('ok_button'), {duration: 3000, panelClass: 'snack_error'});
        console.log('Debug:' + err);
      });
    });

    dialogRef.afterClosed().subscribe(() => { dialogRef.componentInstance.onSelect.unsubscribe();  this.openedTableDetail = false; });
  }

}
