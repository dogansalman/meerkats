import {NgModule} from '@angular/core';
import {AppMaterialModule} from '../../app-material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {CommonModule} from '@angular/common';
import {RegisterComponent} from './register.component';
import {AngularFireDatabaseModule} from '@angular/fire/database';

@NgModule({
  imports: [
    AppMaterialModule,
    CommonModule,
    FlexLayoutModule,
    AngularFireDatabaseModule
  ],
  declarations: [RegisterComponent],
  providers: []
})

export class RegisterModule { }
