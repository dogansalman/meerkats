import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TablesComponent} from './tables.component';
import {AppMaterialModule} from '../app-material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {TablesRoutingModule} from './tables-routing.module';
import {TableComponent} from './table/table.component';
import {TableModule} from './table/table.module';
import {ConfirmComponent} from '../components/confirm/confirm.component';
import {ConfirmModule} from '../components/confirm/confirm.module';

@NgModule({
  imports:[AppMaterialModule,FlexLayoutModule, CommonModule, TablesRoutingModule, TableModule, ConfirmModule],
  declarations:[TablesComponent],
  entryComponents:[TableComponent, ConfirmComponent]

})

export class TablesModule{}
