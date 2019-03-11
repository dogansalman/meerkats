import {AfterContentInit, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {OrderComponent} from './order/order.component';
import {MatDialog} from '@angular/material';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit, AfterContentInit {


  constructor(private spn: NgxSpinnerService, private dialog: MatDialog ) { }

  ngOnInit() {  }

  ngAfterContentInit() { this.spn.hide(); }

  orderModal(): void {
    const dialogRef =  this.dialog.open(OrderComponent, {panelClass: 'fullscreen'});
    dialogRef.afterClosed().subscribe(result => { });
  }
}
