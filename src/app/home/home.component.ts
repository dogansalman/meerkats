import {AfterContentInit, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {SnackbarService} from '../services/snackbar/snackbar.service';
import {OrderComponent} from './order/order.component';
import {MatDialog} from '@angular/material';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireList} from '@angular/fire/database';


class Book {
  constructor(public title) { }
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit, AfterContentInit {

  // Firebase List Object
  storyList: AngularFireList<any>;

  constructor(private spn: NgxSpinnerService, private snack: SnackbarService, private dialog: MatDialog, private db: AngularFireDatabase ) {

    /*
    Firebase Create example
    * */
    this.storyList = this.db.list('stories');
    this.storyList.push({name: 'doğan', surname: 'salman'});
  }

  ngOnInit() {
    this.snack.show('Henüz masa oluşturmadınız.', 'Ekle', 'success').afterDismissed().subscribe(() => {});
  }

  ngAfterContentInit() { this.spn.hide(); }

  orderModal(): void {
    const dialogRef =  this.dialog.open(OrderComponent, {panelClass: 'fullscreen'});
    dialogRef.afterClosed().subscribe(result => { });
  }
}
