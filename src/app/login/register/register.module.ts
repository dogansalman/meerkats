import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {AppMaterialModule} from '../../modules/material/app-material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {CommonModule} from '@angular/common';
import {RegisterComponent} from './register.component';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {TranslateModule} from '../../services/translate/translate.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    AppMaterialModule,
    CommonModule,
    FlexLayoutModule,
    AngularFireDatabaseModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [RegisterComponent],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class RegisterModule { }
