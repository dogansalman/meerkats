import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableComponent} from './table.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AppMaterialModule} from '../../modules/material/app-material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  imports: [FlexLayoutModule, AppMaterialModule, CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [TableComponent]
})

export class TableModule{}
