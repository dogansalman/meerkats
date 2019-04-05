import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {AppMaterialModule} from '../modules/material/app-material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AccountComponent} from './account.component';
import {TranslateModule} from '../services/translate/translate.module';
import {AccountRoutingModule} from './account-routing.module';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AgmCoreModule} from '@agm/core';
import {CommonModule} from '@angular/common';
import {BussinessTypeServices} from '../models/bussinessType/bussinessType.services';
import {HttpRequestService} from '../services/httpRequest/httpRequest.service';
import {ConfirmModule} from '../components/confirm/confirm.module';
import {ConfirmComponent} from '../components/confirm/confirm.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ProvinceComponent} from '../components/province/province.component';
import {ProvinceModule} from '../components/province/province.module';

@NgModule(
  {
    imports: [AppMaterialModule,
      FlexLayoutModule,
      TranslateModule,
      AccountRoutingModule,
      AngularFireDatabaseModule,
      AgmCoreModule,
      CommonModule,
      ConfirmModule,
      FormsModule,
      ReactiveFormsModule,
      ProvinceModule
    ],
    declarations: [AccountComponent, ProvinceComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [BussinessTypeServices, HttpRequestService],
    entryComponents: [ConfirmComponent]
  }
)
export class AccountModule { }
