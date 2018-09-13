import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginRoutingModule} from './login-routing.module';
import {LoginComponent} from './login.component';
import {AppMaterialModule} from '../app-material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ForgotModule} from './forgot/forgot.module';
import {ForgotComponent} from './forgot/forgot.component';

@NgModule({
    imports: [
        CommonModule,
        LoginRoutingModule,
        FlexLayoutModule,
        AppMaterialModule,
        ForgotModule


    ],
    declarations: [LoginComponent],
    entryComponents:[
      ForgotComponent
    ]
})

export class LoginModule {}
