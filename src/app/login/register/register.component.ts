import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {DialogData} from '../forgot/forgot.component';
import {AngularFireDatabase} from '@angular/fire/database';
import {BusinessType} from '../../models/bussinessType/businessType';
import {CityStates} from '../../interfaces/city_states';
import {BussinessTypeServices} from '../../models/bussinessType/bussinessType.services';
import {HttpRequestService} from '../../services/httpRequest/httpRequest.service';
import {Coords} from '../../interfaces/coords';
import {Marker} from '../../interfaces/marker';
import {environment} from '../../../environments/environment.prod';
import {MouseEvent} from '@agm/core';

@Component({
    templateUrl: './register.component.html',
    providers: [BussinessTypeServices, HttpRequestService]
})

export class RegisterComponent implements OnInit {
  /* Models*/
  BusinessTypeList: BusinessType[];
  /* Interfaces */
  Cities: CityStates[];
  States: CityStates[];
  cordi: Coords = {
    latitude: 0,
    longitude: 0
  };
  markers: Marker[];
  /* Properties */
  zoom: Number = 8;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, public db: AngularFireDatabase, private bustypeService: BussinessTypeServices, private http: HttpRequestService) { }

  ngOnInit() {
    // TODO ÜLKE SEÇİMİ İLE BİRLİKTE İL İLÇELER LİSTELENECEK
    this.getCity();
    this.getBusinessType();
  }

  public getCity() {
    this.http.get('http://geodata.solutions/api/api.php?type=getStates&countryId=TR', {}).subscribe(data => {
      this.Cities = [];
      Object.keys(data.result).forEach(key => {
        this.Cities.push({id: key, name: data.result[key]} as CityStates);
      });
      this.Cities.sort((a, b) => a.name.localeCompare(b.name));
    });
  }
  public getBusinessType() {
    this.bustypeService.get().snapshotChanges().subscribe(res => {
      this.BusinessTypeList = [];
      res.forEach(element => {
        const item = element.payload.toJSON();
        item['$key'] = element.key;
        this.BusinessTypeList.push(item as BusinessType);
      });
    });
  }
  public getStates(country_id: string, state_id: string) {
  this.http.get('http://geodata.solutions/api/api.php?type=getCities&countryId=' + country_id + '&stateId=' + state_id, {}).subscribe(data => {
      this.States = [];
      Object.keys(data.result).forEach(key => {
        this.States.push({id: key, name: data.result[key]} as CityStates);
      });
      this.States.sort((a, b) => a.name.localeCompare(b.name));
    });
  }
  public getCordinates(name: string) {
    this.http.get('https://maps.google.com/maps/api/geocode/json?address=' + name + '&key=' + environment.mapKey, {}).subscribe((data => {
      this.cordi.latitude = data.results[0].geometry.location.lat;
      this.cordi.longitude = data.results[0].geometry.location.lng;
      this.zoom = 14;
    }));
  }
  public mapClicked($event: MouseEvent) {
    // TODO bu event içinde seçili il ilçe sınırları içerisinde olup olmadığıı kontrol edilecek.
    this.markers = [];
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    });
  }
  markerDragEnd(m: Marker, $event: MouseEvent) {
    // TODO bu event içinde seçili il ilçe sınırları içerisinde olup olmadığıı kontrol edilecek.
    console.log('dragEnd', m, $event);
  }

}

