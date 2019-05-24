import {AfterViewInit, Component, OnInit} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {BussinessTypeServices} from '../models/bussinessType/bussinessType.services';
import {environment} from '../../environments/environment.prod';
import {ConfirmComponent} from '../components/confirm/confirm.component';
import {MatDialog} from '@angular/material';
import {TranslatePipe} from '../services/translate/translate.pipe';
import {AuthService} from '../services/auth/auth.service';
import {MatSnackBar} from '@angular/material';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {AccountService} from '../models/account/account.service';
import {Account} from '../models/account/account';
import {PasswordComponent} from './password/password.component';
import {EmailComponent} from './email/email.component';
import {LocationComponent} from './location/location.component';
@Component(
  {
    selector: 'meerkats-account',
    templateUrl: 'account.component.html',
    providers: [TranslatePipe, AuthService, AccountService],
  }
)

export class AccountComponent implements AfterViewInit, OnInit {
  /* Models*/
  business_types: string[];
  cities: any[];
  public frmGroup: FormGroup;


  constructor(public spinner: NgxSpinnerService, private bustypeService: BussinessTypeServices,
              private dialog: MatDialog,
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
      phone: [null, [Validators.maxLength(255)]]
    });
  }

  openLocation(): void {
    const dialogRef =  this.dialog.open(LocationComponent, {panelClass: 'fullscreen', data: this.frmGroup.value.location});
    dialogRef.afterClosed().subscribe(result => { });
  }

  ngOnInit() {
    this.business_types = environment.business_types;
    this.auth.getProfileDetail.subscribe(u => this.frmGroup.patchValue(u));
  }
  reSendVerifyEmail(): void {
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
  onChangeAccount(): void {
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
  onSelectChangeProvince(e: any): void {
    this.frmGroup.patchValue({location: {district: null, coords: null}});
  }
  onSelectChangeDistrict(e: any): void {
    this.frmGroup.patchValue({location: {coords: null}});
  }
  ngAfterViewInit(): void { this.spinner.hide(); }
  onResetPassword(): void {
    this.dialog.open(PasswordComponent, {width: '550px', height: '375px'});
  }
  onChangeEmail(): void {
    this.dialog.open(EmailComponent, {width: '550px', height: '375px'});
  }
}

