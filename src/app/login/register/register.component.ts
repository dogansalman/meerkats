import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {DialogData} from '../forgot/forgot.component';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {BusinessType} from '../../models/bussinessType/businessType';
import {BussinessTypeServices} from '../../models/bussinessType/bussinessType.services';

@Component({
    templateUrl: './register.component.html',
    providers: [BussinessTypeServices]
})

export class RegisterComponent implements OnInit {
  BusList: BusinessType[];
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, public db: AngularFireDatabase, private busSer: BussinessTypeServices) { }

  ngOnInit() {
    const x = this.busSer.get();
    // this.GetBussiness();
  }

  GetBussiness(): any {
    this.db.list('/stories/').snapshotChanges().subscribe(res => {
      this.BusList = [];
      res.forEach(element => {
        const y = element.payload.toJSON();
        y['$key'] = element.key;
        this.BusList.push(y as BusinessType);
      });
      console.log(this.BusList);
    });
  }
}

