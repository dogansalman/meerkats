import {AfterViewInit, Component, OnInit} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {BussinessTypeServices} from '../models/bussinessType/bussinessType.services';
import {HttpRequestService} from '../services/httpRequest/httpRequest.service';
import {environment} from '../../environments/environment.prod';
import {ConfirmComponent} from '../components/confirm/confirm.component';
import {MatDialog} from '@angular/material';
import {TranslatePipe} from '../services/translate/translate.pipe';
import {AuthService} from '../services/auth/auth.service';
import {MatSnackBar} from '@angular/material';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {AccountService} from '../models/account/account.service';
import {Account} from '../models/account/account';
import {Coords} from '../interfaces/coords';
import {Marker} from '../interfaces/marker';


@Component(
  {
    selector: 'app-account',
    templateUrl: 'account.component.html',
    providers: [TranslatePipe, AuthService, AccountService],
  }
)

export class AccountComponent implements AfterViewInit, OnInit {
  /* Models*/
  business_types: string[];
  cities: any[];
  cordi: Coords = {
    latitude: 0,
    longitude: 0
  };
  markers: Marker[];
  zoom: Number = 8;
  public frmGroup: FormGroup;

  constructor(private spinner: NgxSpinnerService, private bustypeService: BussinessTypeServices,
              private http: HttpRequestService, private dialog: MatDialog,
              public auth: AuthService,
              private snack: MatSnackBar,
              private fb: FormBuilder,
              private accService: AccountService,
              private translater: TranslatePipe) {

    this.frmGroup = this.fb.group({
      business_name: [null, [Validators.required, Validators.maxLength(255)]],
      business_type: [null, [Validators.required, Validators.maxLength(255)]],
      location: this.fb.group({
        adress: [null, [Validators.maxLength(255)]],
        province: {
          id: [null],
          name: [null]
        },
        district: [null],
        coords: {
          latitude: [null],
          longitude: [null]
        }
      }),
      phone: [null, [Validators.maxLength(255)]],
      email: [null, [Validators.required, Validators.email, Validators.maxLength(255)]]
    });
  }

  ngOnInit() {
    this.business_types = environment.business_types;
    this.auth.getProfileDetail.subscribe(u => {
      console.log(u);
      this.frmGroup.patchValue(u);
    });
  }

  public reSendVerifyEmail(): void {
    if (this.auth.afAuth.auth.currentUser.emailVerified) { return; }
    this.spinner.show();
    this.auth.afAuth.auth.currentUser.sendEmailVerification().then(() => {
      this.spinner.hide();
      this.snack.open(this.translater.transform('successfull'), this.translater.transform('ok_button'), {duration: 3000, panelClass: 'snack_success'});
    }).catch((err) => {
      this.spinner.hide();
      this.snack.open(err.message || this.translater.transform('unsuccessful'), this.translater.transform('ok_button'), {duration: 3000, panelClass: 'snack_error'});
    });
  }
  public onChangeAccount(): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '450px',
      data: {message: this.translater.transform('account_approve_message'), title: this.translater.transform('sure_message_title') }
    });
    dialogRef.componentInstance.onSelect.subscribe(result => {
     if (!result) { return; }
     this.spinner.show();
      this.accService.update(this.frmGroup.value as Account, this.auth.afAuth.auth.currentUser.uid).then(() => {
        this.spinner.hide();
        this.snack.open(this.translater.transform('successful'), this.translater.transform('ok_button'), {duration: 3000, panelClass: 'snack_success'});
      }).catch(err => {
        this.spinner.hide();
        this.snack.open(err.message || this.translater.transform('successful'), this.translater.transform('ok_button'), {duration: 3000, panelClass: 'snack_success'});
      });
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
  onChangeMatTabToLocation(index: number): void {
    /* on tab to location */
    console.log(this.frmGroup.value);

    if (index === 1) {
      this.http.get('https://maps.google.com/maps/api/geocode/json?address=' + this.frmGroup.value.province.name + ' ' + this.frmGroup.value.district.name + '&key=' + environment.mapKey, {}).subscribe((data => {
        this.cordi.latitude = data.results[0].geometry.location.lat;
        this.cordi.longitude = data.results[0].geometry.location.lng;
        this.zoom = 14;
      }));
    }
  }
  public mapClicked($event: any) {
   this.markers = [];
   this.markers.push({lat: $event.coords.lat, lng: $event.coords.lng, draggable: true});
  }
  ngAfterViewInit(): void { this.spinner.hide(); }

}
