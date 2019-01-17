import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ForgotComponent} from './forgot.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AppMaterialModule} from '../../modules/material/app-material.module';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    AppMaterialModule
  ],
  declarations: [ForgotComponent],
})

export class ForgotModule {}
