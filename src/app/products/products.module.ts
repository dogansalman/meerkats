import {NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {AppMaterialModule} from '../modules/material/app-material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ProductsComponent} from './products.component';
import {ProductsRoutingModule} from './products-routing.module';
import {CommonModule} from '@angular/common';
import {ProductComponent} from './product/product.component';
import {ProductModule} from './product/product.module';
import {TranslateModule} from '../services/translate/translate.module';
import {FilterModule} from '../pipes/filter/filter.module';
import {ConfirmComponent} from '../components/confirm/confirm.component';
import {ConfirmModule} from '../components/confirm/confirm.module';
import {LazyLoadImagesModule }  from 'ngx-lazy-load-images';
@NgModule({
  imports: [AppMaterialModule, FlexLayoutModule, ProductsRoutingModule, CommonModule, ProductModule, TranslateModule, FilterModule, ConfirmModule, LazyLoadImagesModule],
  declarations: [ProductsComponent],
  entryComponents: [ProductComponent, ConfirmComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})

export class ProductsModule {}
