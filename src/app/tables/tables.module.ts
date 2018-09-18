import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TablesComponent} from './tables.component';
import {AppMaterialModule} from '../app-material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {TablesRoutingModule} from './tables-routing.module';
import {AddTableComponent} from './add-table/add-table.component';
import {AddTableModule} from './add-table/add-table.module';

@NgModule({
  imports:[AppMaterialModule,FlexLayoutModule, CommonModule, TablesRoutingModule, AddTableModule],
  declarations:[TablesComponent],
  entryComponents:[AddTableComponent]

})

export class TablesModule{}
