import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginRoutingModule} from './login-routing.module';
import {LoginComponent} from './login.component';
import {AppMaterialModule} from '../app-material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ForgotModule} from './forgot/forgot.module';
import {ForgotComponent} from './forgot/forgot.component';
import {RegisterModule} from './register/register.module';
import {RegisterComponent} from './register/register.component';
import {BussinessTypeServices} from '../models/bussinessType/bussinessType.services';
import {AngularFireDatabaseModule} from '@angular/fire/database';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    FlexLayoutModule,
    AppMaterialModule,
    ForgotModule,
    RegisterModule,
    AngularFireDatabaseModule
  ],
  providers: [BussinessTypeServices],
  declarations: [LoginComponent],
  entryComponents: [
    ForgotComponent,
    RegisterComponent
  ]
})

export class LoginModule {}

