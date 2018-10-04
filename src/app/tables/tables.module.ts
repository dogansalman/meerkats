import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TablesComponent} from './tables.component';
import {AppMaterialModule} from '../app-material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {TablesRoutingModule} from './tables-routing.module';
import {AddTableComponent} from './add/add-table.component';
import {AddTableModule} from './add/add-table.module';
import {ConfirmComponent} from '../components/confirm/confirm.component';
import {ConfirmModule} from '../components/confirm/confirm.module';

@NgModule({
  imports:[AppMaterialModule,FlexLayoutModule, CommonModule, TablesRoutingModule, AddTableModule, ConfirmModule],
  declarations:[TablesComponent],
  entryComponents:[AddTableComponent, ConfirmComponent]

})

export class TablesModule{}
