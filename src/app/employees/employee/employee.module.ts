import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppMaterialModule} from '../../modules/material/app-material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {EmployeeComponent} from './employee.component';
import {TranslateModule} from '../../services/translate/translate.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  imports: [AppMaterialModule, FlexLayoutModule, TranslateModule, FormsModule, ReactiveFormsModule, CommonModule],
  declarations: [EmployeeComponent]
})

export class EmployeeModule {}
