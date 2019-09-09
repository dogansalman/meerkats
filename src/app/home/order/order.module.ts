import {AppMaterialModule} from '../../modules/material/app-material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NgModule} from '@angular/core';
import {OrderComponent} from './order.component';
import {CommonModule} from '@angular/common';
import {QuantityComponent} from '../../components/quantity/quantity.component';
import {QuantityModule} from '../../components/quantity/quantity.module';
import {TranslateModule} from '../../services/translate/translate.module';
import {ConfirmModule} from '../../components/confirm/confirm.module';
import {FilterModule} from '../../pipes/filter/filter.module';

@NgModule({
  imports: [AppMaterialModule, FlexLayoutModule, CommonModule, QuantityModule, TranslateModule, ConfirmModule, FilterModule],
  declarations: [OrderComponent],
  entryComponents: [QuantityComponent]
})

export class OrderModule {}
