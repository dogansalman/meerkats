import {Component, OnInit, ViewEncapsulation, AfterViewInit} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {TableComponent} from './table/table.component';
import {ConfirmComponent} from '../components/confirm/confirm.component';
import {MatDialog, MatSnackBar} from '@angular/material';
import {TranslatePipe} from '../services/translate/translate.pipe';
import {TableService} from '../models/table/table.service';
import {Table} from '../models/table/table';
import {Observable} from 'rxjs/internal/Observable';
import {tap} from 'rxjs/operators';
import {keyVal} from '../operators/keyVal/keyVal';


@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [TranslatePipe, TableService]
})
export class TablesComponent implements OnInit, AfterViewInit {
  public openedTableDetail = false;
  public tables: Observable<Table[]>;
  public locations: any;

  constructor(private spinner: NgxSpinnerService, public dialog: MatDialog,
              private snack: MatSnackBar,
              private translater: TranslatePipe,
              private tableServ: TableService,
              ) {
    this.spinner.show();
  }

  ngOnInit() {

    /* Get locations */
    this.tableServ.get().snapshotChanges().pipe(keyVal(), tap(a => this.locations = this.tableServ.getLocation(a))).subscribe();
    /* Get tables */
    this.tables  = this.tableServ.get().snapshotChanges().pipe(keyVal(), tap(() => this.spinner.hide()));
  }

  ngAfterViewInit(): void {
    /* Hide spinner when empty data */
    this.tables.subscribe(d =>  d.length === 0 ? this.spinner.hide() : null);
  }

  /* On table detail modal */
  onTableDetail(table: Table = null): void {
    if (this.openedTableDetail) { return; }
    this.openedTableDetail = true;
    const dialogRef =  this.dialog.open(TableComponent, {width: '600px', height: '600px', data: {table: table, locations: this.locations}});

    dialogRef.afterClosed().subscribe((result) => {
      this.openedTableDetail = false;
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
