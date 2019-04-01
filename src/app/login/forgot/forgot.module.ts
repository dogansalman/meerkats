import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ForgotComponent} from './forgot.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AppMaterialModule} from '../../modules/material/app-material.module';
import {TranslateModule} from '../../services/translate/translate.module';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    AppMaterialModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ForgotComponent],
})

export class ForgotModule {}
