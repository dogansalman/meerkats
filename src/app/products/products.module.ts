import {NgModule} from '@angular/core';
import {AppMaterialModule} from '../app-material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ProductsComponent} from './products.component';
import {ProductsRoutingModule} from './products-routing.module';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [AppMaterialModule, FlexLayoutModule, ProductsRoutingModule, CommonModule],
  declarations: [ProductsComponent]
})

export class ProductsModule {}
