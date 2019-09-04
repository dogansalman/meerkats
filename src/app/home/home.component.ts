import {AfterContentInit, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {OrderComponent} from './order/order.component';
import {MatDialog} from '@angular/material';
import {TableService} from '../models/table/table.service';
import {Table} from '../models/table/table';
import {Observable} from 'rxjs/internal/Observable';
import {keyVal} from '../operators/keyVal/keyVal';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'meerkats-home',
  templateUrl: './home.component.html',
  encapsulation: ViewEncapsulation.None,
  providers: [TableService]
})
export class HomeComponent implements OnInit, AfterContentInit {

  /* Properties  */
  public tables: Observable<Table[]>;
  public locations: any;

  constructor(private spinner: NgxSpinnerService, private dialog: MatDialog, private tableService: TableService ) { }

  ngOnInit() {
    /* Get locations */
    this.tableService.get().snapshotChanges().pipe(keyVal(), tap(a => this.locations = this.tableService.getLocation(a))).subscribe();
    /* Get tables */
    this.tables  = this.tableService.get().snapshotChanges().pipe(keyVal(), tap(() => this.spinner.hide()));
  }

  ngAfterContentInit() {
    /* Hide spinner when empty data */
    this.tables.subscribe(d =>  d.length === 0 ? this.spinner.hide() : null);
  }

  orderModal(): void {
    const dialogRef =  this.dialog.open(OrderComponent, {panelClass: 'fullscreen'});
    dialogRef.afterClosed().subscribe(result => { });
  }
}
