import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppMaterialModule} from '../modules/material/app-material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {TranslateModule} from '../services/translate/translate.module';
import {ConfirmModule} from '../components/confirm/confirm.module';
import {ConfirmComponent} from '../components/confirm/confirm.component';
import {FilterModule} from '../pipes/filter/filter.module';
import {TablesRoutingModule} from './tables-routing.module';
import {TableModule} from './table/table.module';
import {TableComponent} from './table/table.component';
import {TablesComponent} from './tables.component';

@NgModule({
  imports: [AppMaterialModule, FlexLayoutModule, CommonModule, TablesRoutingModule, TableModule, ConfirmModule, TranslateModule, FilterModule],
  declarations: [TablesComponent],
  entryComponents: [TableComponent, ConfirmComponent]

})

export class TablesModule {}
