import {NgModule} from '@angular/core';
import {AppMaterialModule} from '../modules/material/app-material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {BusinessComponent} from './business.component';
import {TranslateModule} from '../services/translate/translate.module';
import {BusinessRoutingModule} from './business-routing.module';

@NgModule(
  {
    imports: [AppMaterialModule, FlexLayoutModule, TranslateModule, BusinessRoutingModule],
    declarations: [BusinessComponent]
  }
)
export class BusinessModule { }
