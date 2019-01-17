import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {KitchenComponent} from './kitchen.component';
import {AppMaterialModule} from '../modules/material/app-material.module';
import {KitchenRoutingModule} from './kitchen-routing.module';

@NgModule({
  imports:[AppMaterialModule, KitchenRoutingModule, FlexLayoutModule, CommonModule],
  declarations:[KitchenComponent]
})
export class KitchenModule{}
