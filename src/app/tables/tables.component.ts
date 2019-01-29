import {Component, OnInit, AfterContentInit,  ViewEncapsulation} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {TableComponent} from './table/table.component';
import {ConfirmComponent} from '../components/confirm/confirm.component';
import {MatDialog} from '@angular/material';
import {TranslatePipe} from '../services/translate/translate.pipe';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [TranslatePipe]
})
export class TablesComponent implements OnInit, AfterContentInit {

  constructor(private spinner: NgxSpinnerService, public dialog: MatDialog, private translater: TranslatePipe) { }

  ngOnInit() { this.spinner.show(); }
  ngAfterContentInit() { this.spinner.hide(); }

  openDialog(): void {
    const dialogRef = this.dialog.open(TableComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => { });
  }

  Confirm(): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '450px',
      data: {message: this.translater.transform('sure_message'), title: this.translater.transform('sure_message_title')}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) console.log('delete it');
    });
  }
}
