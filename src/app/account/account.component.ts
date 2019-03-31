import {AfterViewInit, Component, OnInit} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {BusinessType} from '../models/bussinessType/businessType';
import {CityStates} from '../interfaces/city_states';
import {Coords} from '../interfaces/coords';
import {Marker} from '../interfaces/marker';
import {BussinessTypeServices} from '../models/bussinessType/bussinessType.services';
import {HttpRequestService} from '../services/httpRequest/httpRequest.service';
import {environment} from '../../environments/environment.prod';
import {MouseEvent} from '@agm/core';
import {ConfirmComponent} from '../components/confirm/confirm.component';
import {MatDialog} from '@angular/material';
import {TranslatePipe} from '../services/translate/translate.pipe';
import {AccountService} from '../models/account/account.service';
import {Account} from '../models/account/account';

@Component(
  {
    selector: 'app-account',
    templateUrl: 'account.component.html',
    providers: [TranslatePipe, AccountService]
  }
)

export class AccountComponent implements AfterViewInit, OnInit {
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
  constructor(private spinner: NgxSpinnerService, private bustypeService: BussinessTypeServices,
              private http: HttpRequestService, private dialog: MatDialog,
              private translater: TranslatePipe, private accServ: AccountService) { }

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

  onRegister(): void {
    const u = {
      business_name: 'Maya Kafe',
      email: 'dogansalman@outlook.com',
      adress: 'adresasdasdasd asda',
      business_type: 'Kafe',
      password: '6515336',
      city: 'Tekirdağ',
      state: 'Çorlu',
      phone: '0252 666 98 98'
    }
    this.accServ.create(u);
  }

  public onChangeAccount(): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '450px',
      data: {message: this.translater.transform('account_approve_message'), title: this.translater.transform('sure_message_title') }
    });
    dialogRef.componentInstance.onSelect.subscribe(result => {
      if (result) { console.log('Ok!'); }
    });
    dialogRef.afterClosed().subscribe(() => dialogRef.componentInstance.onSelect.unsubscribe());
  }
  public onChangePassword(): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '450px',
      data: {message: this.translater.transform('sure_message'), title: this.translater.transform('sure_message_title') }
    });
    dialogRef.componentInstance.onSelect.subscribe(result => {
      if (result) { console.log('Ok!'); }
    });
    dialogRef.afterClosed().subscribe(() => dialogRef.componentInstance.onSelect.unsubscribe());
  }
  ngAfterViewInit(): void { this.spinner.hide(); }

}
