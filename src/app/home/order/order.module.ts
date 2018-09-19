import {AppMaterialModule} from '../../app-material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NgModule} from '@angular/core';
import {OrderComponent} from './order.component';
import {CommonModule} from '@angular/common';

@NgModule({
  imports:[AppMaterialModule, FlexLayoutModule, CommonModule],
  declarations:[OrderComponent]
})

export class OrderModule{}
