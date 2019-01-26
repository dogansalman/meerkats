import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {AppMaterialModule} from '../../modules/material/app-material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {CommonModule} from '@angular/common';
import {RegisterComponent} from './register.component';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AgmCoreModule} from '@agm/core';
import {PipesModule} from '../../modules/shared-pipes/pipes.module';

@NgModule({
  imports: [
    AppMaterialModule,
    CommonModule,
    FlexLayoutModule,
    AngularFireDatabaseModule,
    AgmCoreModule,
    PipesModule
  ],
  declarations: [RegisterComponent],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class RegisterModule { }
