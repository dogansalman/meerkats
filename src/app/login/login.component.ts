import {AfterContentInit, Component, OnInit, ViewEncapsulation, OnDestroy} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {ForgotComponent} from './forgot/forgot.component';
import {MatDialog} from '@angular/material';
import {Renderer2} from '@angular/core';
import {RegisterComponent} from './register/register.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth/auth.service';
import {MatSnackBar} from '@angular/material';
import {TranslatePipe} from '../services/translate/translate.pipe';

@Component({
  selector: 'meerkats-login',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService, TranslatePipe]
})
export class LoginComponent implements OnInit, AfterContentInit, OnDestroy {
  public frmGroup: FormGroup;
  constructor(private spinner: NgxSpinnerService,
              public dialog: MatDialog,
              private renderer: Renderer2,
              private fb: FormBuilder,
              private auth: AuthService,
              private snack: MatSnackBar,
              private translater: TranslatePipe) {
    this.frmGroup = fb.group(
      {
        'email': [null, [Validators.required, Validators.email]],
        'password': [null, [Validators.required]]
      }
    );

  }

  forgotModal(): void {
    this.dialog.open(ForgotComponent, {width: '550px', height: '375px'});
  }
  registerModal(): void {
    this.dialog.open(RegisterComponent, {width: '550px', height: '500px'});
  }
  onLogin(): void {
    if (!this.frmGroup.valid) { return; }
    this.spinner.show();
    this.auth.login(this.frmGroup.value['email'], this.frmGroup.value['password']).then((result) => {
      if (result === false) {
        this.spinner.hide();
        this.snack.open(this.translater.transform('login_failed'), this.translater.transform('ok_button'), {duration: 3000, panelClass: 'snack_error'});
      }
    });
  }
  ngOnInit() {
    this.renderer.addClass(document.body, 'meerkats-login');
    this.spinner.show();
  }
  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'meerkats-login');
  }
  ngAfterContentInit() {  this.spinner.hide(); }
}
