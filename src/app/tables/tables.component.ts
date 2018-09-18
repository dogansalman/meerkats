import {Component, OnInit, AfterContentInit,  ViewEncapsulation} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {AddTableComponent} from './add-table/add-table.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TablesComponent implements OnInit, AfterContentInit {

  constructor(private spinner: NgxSpinnerService, private dialog: MatDialog) { }

  ngOnInit() { this.spinner.show(); }
  ngAfterContentInit(){ this.spinner.hide() }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddTableComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }
}
