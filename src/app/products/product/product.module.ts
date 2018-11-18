import {NgModule} from '@angular/core';
import {AppMaterialModule} from '../../app-material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ProductComponent} from './product.component';

@NgModule({
  imports: [AppMaterialModule, FlexLayoutModule],
  declarations: [ProductComponent]
})

export class ProductModule {}
