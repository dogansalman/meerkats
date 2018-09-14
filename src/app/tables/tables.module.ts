import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TablesComponent} from './tables.component';
import {AppMaterialModule} from '../app-material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {TablesRoutingModule} from './tables-routing.module';

@NgModule({
  imports:[AppMaterialModule,FlexLayoutModule, CommonModule, TablesRoutingModule],
  declarations:[TablesComponent],

})

export class TablesModule{}
