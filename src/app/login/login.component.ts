import {AfterContentInit, Component, OnInit, ViewEncapsulation, OnDestroy} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {ForgotComponent} from './forgot/forgot.component';
import {MatDialog} from '@angular/material';
import {Renderer2} from '@angular/core';
import {RegisterComponent} from './register/register.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth/auth.service';

@Component({
  selector: 'app-login',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit, AfterContentInit, OnDestroy {
  public frmGroup: FormGroup;
  constructor(private spinner: NgxSpinnerService, public dialog: MatDialog, private renderer: Renderer2, private fb: FormBuilder, private auth: AuthService) {
    this.frmGroup = fb.group(
      {
        'email': [null, [Validators.required, Validators.email]],
        'password': [null, [Validators.required]]
      }
    );
  }

  forgotModal(): void {
    const dialogRef = this.dialog.open(ForgotComponent, {
      width: '450px',
      data: {name: 'name', animal: 'animal'}
    });

    dialogRef.afterClosed().subscribe(result => { });
  }
  registerModal(): void {
    const dialogRef = this.dialog.open(RegisterComponent, {height: '100vh', width: '700px'});
  }
  onLogin(): void {
    if (!this.frmGroup.valid) { return; }
    this.auth.login(this.frmGroup.value['email'], this.frmGroup.value['password']);
  }
  ngOnInit() {
    this.renderer.addClass(document.body, 'app-login');
    this.spinner.show();
  }
  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'app-login');
  }
  ngAfterContentInit() { this.spinner.hide(); }
}
