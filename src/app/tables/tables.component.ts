import {Component, OnInit, AfterContentInit,  ViewEncapsulation} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {TableComponent} from './table/table.component';
import {ConfirmComponent} from '../components/confirm/confirm.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TablesComponent implements OnInit, AfterContentInit {

  constructor(private spinner: NgxSpinnerService, public dialog: MatDialog) { }

  ngOnInit() { this.spinner.show(); }
  ngAfterContentInit(){ this.spinner.hide() }

  openDialog(): void {
    const dialogRef = this.dialog.open(TableComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

  Confirm(): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '450px',
      data: {message: 'Silmek istediğinize emin misiniz ?', title:'Emin misiniz ?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) console.log('delete it');
    });
  }
}
