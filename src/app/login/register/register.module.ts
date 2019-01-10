import {NgModule} from '@angular/core';
import {AppMaterialModule} from '../../app-material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {CommonModule} from '@angular/common';
import {RegisterComponent} from './register.component';

@NgModule({
  imports: [
    AppMaterialModule,
    CommonModule,
    FlexLayoutModule
  ],
  declarations: [RegisterComponent]
})

export class RegisterModule { }
