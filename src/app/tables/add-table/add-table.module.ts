import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddTableComponent} from './add-table.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AppMaterialModule} from '../../app-material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  imports: [FlexLayoutModule, AppMaterialModule, CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [AddTableComponent]
})

export class AddTableModule{}
