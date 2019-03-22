import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginRoutingModule} from './login-routing.module';
import {LoginComponent} from './login.component';
import {AppMaterialModule} from '../modules/material/app-material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ForgotModule} from './forgot/forgot.module';
import {ForgotComponent} from './forgot/forgot.component';
import {RegisterModule} from './register/register.module';
import {RegisterComponent} from './register/register.component';
import {TranslateModule} from '../services/translate/translate.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    FlexLayoutModule,
    AppMaterialModule,
    ForgotModule,
    RegisterModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  declarations: [LoginComponent],
  entryComponents: [
    ForgotComponent,
    RegisterComponent
  ]
})

export class LoginModule {}

