import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {DialogData} from '../forgot/forgot.component';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';

@Component({
    templateUrl: './register.component.html'
})
export class RegisterComponent {
  public  buslist: AngularFireList<any>;

  constructor(public dialogRef: MatDialogRef<RegisterComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData, public db: AngularFireDatabase) {

    this.buslist =  db.list('/business_type');
    console.log(this.buslist);
  }
}
