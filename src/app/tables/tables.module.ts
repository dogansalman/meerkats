import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TablesComponent} from './tables.component';
import {AppMaterialModule} from '../modules/material/app-material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {TablesRoutingModule} from './tables-routing.module';
import {TableComponent} from './table/table.component';
import {TableModule} from './table/table.module';
import {ConfirmComponent} from '../components/confirm/confirm.component';
import {ConfirmModule} from '../components/confirm/confirm.module';
import {TranslateModule} from '../services/translate/translate.module';
import {FilterModule} from '../pipes/filter/filter.module';

@NgModule({
  imports: [AppMaterialModule, FlexLayoutModule, CommonModule, TablesRoutingModule, TableModule, ConfirmModule, TranslateModule, FilterModule],
  declarations: [TablesComponent],
  entryComponents: [TableComponent, ConfirmComponent]

})

export class TablesModule {}
