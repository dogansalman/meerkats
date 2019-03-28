import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableComponent} from './table.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AppMaterialModule} from '../../modules/material/app-material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '../../services/translate/translate.module';
import {QRCodeModule} from 'angularx-qrcode';

@NgModule({
  imports: [FlexLayoutModule, AppMaterialModule, CommonModule, FormsModule, ReactiveFormsModule, TranslateModule, QRCodeModule],
  declarations: [TableComponent]
})

export class TableModule {}
