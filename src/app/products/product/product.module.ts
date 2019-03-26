import {NgModule} from '@angular/core';
import {AppMaterialModule} from '../../modules/material/app-material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ProductComponent} from './product.component';
import {TranslateModule} from '../../services/translate/translate.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {AngularFireStorageModule} from '@angular/fire/storage';

@NgModule({
  imports: [AppMaterialModule, FlexLayoutModule, TranslateModule, FormsModule, ReactiveFormsModule, CommonModule, AngularFireStorageModule],
  declarations: [ProductComponent]
})

export class ProductModule {}
