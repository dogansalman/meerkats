import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppMaterialModule} from '../modules/material/app-material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {EmployeesComponent} from './employees.component';
import {EmployeesRoutingModule} from './employees-routing.module';
import {EmployeeComponent} from './employee/employee.component';
import {EmployeeModule} from './employee/employee.module';
import {TranslateModule} from '../services/translate/translate.module';

@NgModule({
  imports: [AppMaterialModule, FlexLayoutModule, CommonModule, EmployeesRoutingModule, EmployeeModule, TranslateModule],
  declarations: [EmployeesComponent],
  entryComponents: [EmployeeComponent]
})

export class EmployeesModule {

}
