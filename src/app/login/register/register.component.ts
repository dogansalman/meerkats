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
  BusinessTypeList: BusinessType[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, public db: AngularFireDatabase, private busSer: BussinessTypeServices) { }

  ngOnInit() {
    this.busSer.get().snapshotChanges().subscribe(res => {
      this.BusinessTypeList = [];
      res.forEach(element => {
        const item = element.payload.toJSON();
        item['$key'] = element.key;
        this.BusinessTypeList.push(item as BusinessType);
      });
    });

  }
}

