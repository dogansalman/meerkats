import {NgModule} from '@angular/core';
import {AppMaterialModule} from '../modules/material/app-material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ProductsComponent} from './products.component';
import {ProductsRoutingModule} from './products-routing.module';
import {CommonModule} from '@angular/common';
import {ProductComponent} from './product/product.component';
import {ProductModule} from './product/product.module';
import {TranslateModule} from '../services/translate/translate.module';

@NgModule({
  imports: [AppMaterialModule, FlexLayoutModule, ProductsRoutingModule, CommonModule, ProductModule, TranslateModule],
  declarations: [ProductsComponent],
  entryComponents: [ProductComponent]
})

export class ProductsModule {}
