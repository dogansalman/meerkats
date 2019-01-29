import {NgModule} from '@angular/core';
import {AppMaterialModule} from '../../modules/material/app-material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ProductComponent} from './product.component';
import {TranslateModule} from '../../services/translate/translate.module';

@NgModule({
  imports: [AppMaterialModule, FlexLayoutModule, TranslateModule],
  declarations: [ProductComponent]
})

export class ProductModule {}
