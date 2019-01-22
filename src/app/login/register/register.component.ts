import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {DialogData} from '../forgot/forgot.component';
import {AngularFireDatabase} from '@angular/fire/database';
import {BusinessType} from '../../models/bussinessType/businessType';
import {BussinessTypeServices} from '../../models/bussinessType/bussinessType.services';
import {HttpRequestService} from '../../services/httpRequest/httpRequest.service';

@Component({
    templateUrl: './register.component.html',
    providers: [BussinessTypeServices, HttpRequestService]
})

export class RegisterComponent implements OnInit {
  BusinessTypeList: BusinessType[];
  public cities: string[];
  lat: number = 51.678418;
  lng: number = 7.809007;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, public db: AngularFireDatabase, private bustypeService: BussinessTypeServices, private http: HttpRequestService) { }

  ngOnInit() {

    // TODO ÜLKE SEÇİMİ İLE BİRLİKTE İL İLÇELER LİSTELENECEK

    /* Get City*/
    this.http.get('http://geodata.solutions/api/api.php?type=getStates&countryId=TR', {}).subscribe(data => {
      // this.cities =  Object.values(data.result);
      this.cities =  data.result;
    });


    // TODO ilçe api url: http://geodata.solutions/api/api.php?type=getCities&countryId=TR&stateId=%2259%22
    /* Get Bussines Types */
    this.bustypeService.get().snapshotChanges().subscribe(res => {
      this.BusinessTypeList = [];
      res.forEach(element => {
        const item = element.payload.toJSON();
        item['$key'] = element.key;
        this.BusinessTypeList.push(item as BusinessType);
      });
    });

  }
}

