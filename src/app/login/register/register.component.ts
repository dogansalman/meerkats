import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {BusinessType} from '../../models/bussinessType/businessType';
import {CityStates} from '../../interfaces/city_states';
import {BussinessTypeServices} from '../../models/bussinessType/bussinessType.services';
import {HttpRequestService} from '../../services/httpRequest/httpRequest.service';
import {Coords} from '../../interfaces/coords';
import {Marker} from '../../interfaces/marker';
import {environment} from '../../../environments/environment.prod';
import {MouseEvent} from '@agm/core';
import {Account} from '../../models/account/account';
import {AccountService} from '../../models/account/account.service';
import {TranslatePipe} from '../../services/translate/translate.pipe';
import {MatSnackBar} from '@angular/material';


@Component({
    templateUrl: './register.component.html',
    providers: [BussinessTypeServices, HttpRequestService, AccountService, TranslatePipe]
})

export class RegisterComponent implements OnInit {
  /* Models*/
  BusinessTypeList: string[];
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

  constructor(public db: AngularFireDatabase,
              private bustypeService: BussinessTypeServices,
              private translater: TranslatePipe,
              private snack: MatSnackBar,
              private http: HttpRequestService, private accServ: AccountService) { }

  ngOnInit() {
    this.getCity();
    this.BusinessTypeList = environment.business_types;
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

  onRegister(): void {
    const u = {
      business_name: 'Maya Kafe',
      email: 'dogansalman@outlook.com',
      adress: 'adresasdasdasd asda',
      business_type: 'Kafe',
      password: '6515336',
      city: 'Tekirdağ',
      state: 'Çorlu',
      phone: '0252 666 98 98',
      coords: {latitude: 0, longitude: 0} as Coords };


    // const a = new Coords
    this.accServ.create(u as Account).then(() => console.log('ok')).catch(err => {
      this.snack.open(this.translater.transform(err.code), this.translater.transform('ok_button'), {duration: 3000, panelClass: 'snack_error'});
    });
  }


}

