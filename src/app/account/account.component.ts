import {AfterViewInit, Component, OnInit} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {CityStates} from '../interfaces/city_states';
import {Marker} from '../interfaces/marker';
import {BussinessTypeServices} from '../models/bussinessType/bussinessType.services';
import {HttpRequestService} from '../services/httpRequest/httpRequest.service';
import {environment} from '../../environments/environment.prod';
import {MouseEvent} from '@agm/core';
import {ConfirmComponent} from '../components/confirm/confirm.component';
import {MatDialog} from '@angular/material';
import {TranslatePipe} from '../services/translate/translate.pipe';
import {AuthService} from '../services/auth/auth.service';
import {Coords} from '../interfaces/coords';
import {MatSnackBar} from '@angular/material';

@Component(
  {
    selector: 'app-account',
    templateUrl: 'account.component.html',
    providers: [TranslatePipe, AuthService]
  }
)

export class AccountComponent implements AfterViewInit, OnInit {
  /* Models*/
  business_types: string[];
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
              public auth: AuthService,
              private snackbar: MatSnackBar,
              private translater: TranslatePipe) { }

  ngOnInit() {
    // TODO ÜLKE SEÇİMİ İLE BİRLİKTE İL İLÇELER LİSTELENECEK
    this.getCity();
    this.business_types = environment.business_types;
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

  public reSendVerifyEmail(): void {
    if (this.auth.afAuth.auth.currentUser.emailVerified) { return; }
    this.spinner.show();
    this.auth.afAuth.auth.currentUser.sendEmailVerification().then(() => {
      this.spinner.hide();
      this.snackbar.open(this.translater.transform('successfull'), this.translater.transform('ok_button'), {duration: 3000, panelClass: 'snack_success'});
    }).catch((err) => {
      this.spinner.hide();
      this.snackbar.open(err.message || this.translater.transform('unsuccessful'), this.translater.transform('ok_button'), {duration: 3000, panelClass: 'snack_error'});
    });
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
