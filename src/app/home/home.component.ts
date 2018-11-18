import {AfterContentInit, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {SnackbarService} from '../services/snackbar/snackbar.service';
import {OrderComponent} from './order/order.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit, AfterContentInit {

  constructor(private spinner: NgxSpinnerService, private snackbarService: SnackbarService, private dialog: MatDialog) { }

  ngOnInit() {
    this.snackbarService.show('Henüz masa oluşturmadınız.','Ekle','success').afterDismissed().subscribe(() => {});
  }

  ngAfterContentInit() { this.spinner.hide(); }

  orderModal(): void {
    const dialogRef =  this.dialog.open(OrderComponent, {width:'100vh', height:'100vh', panelClass:'fullpanel'});
    dialogRef.afterClosed().subscribe(result => { });
  }
}
