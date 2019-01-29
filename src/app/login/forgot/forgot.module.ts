import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ForgotComponent} from './forgot.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AppMaterialModule} from '../../modules/material/app-material.module';
import {TranslateModule} from '../../services/translate/translate.module';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    AppMaterialModule,
    TranslateModule
  ],
  declarations: [ForgotComponent],
})

export class ForgotModule {}
