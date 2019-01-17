import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {QuantityComponent} from './quantity.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AppMaterialModule} from '../../modules/material/app-material.module';
import {NumbersModule} from '../numbers/numbers.module';
import {NumbersComponent} from '../numbers/numbers.component';

@NgModule({
  imports: [CommonModule, FlexLayoutModule, AppMaterialModule, NumbersModule],
  declarations: [QuantityComponent, NumbersComponent]
})

export class QuantityModule{}
