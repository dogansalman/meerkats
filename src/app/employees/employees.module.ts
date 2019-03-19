import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppMaterialModule} from '../modules/material/app-material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {TranslateModule} from '../services/translate/translate.module';
import {ConfirmModule} from '../components/confirm/confirm.module';
import {EmployeesComponent} from './employees.component';
import {ConfirmComponent} from '../components/confirm/confirm.component';
import {EmployeeComponent} from './employee/employee.component';
import {EmployeeModule} from './employee/employee.module';
import {EmployeesRoutingModule} from './employees-routing.module';

@NgModule({
  imports: [AppMaterialModule, FlexLayoutModule, CommonModule, EmployeesRoutingModule, EmployeeModule, TranslateModule, ConfirmModule],
  declarations: [EmployeesComponent],
  entryComponents: [EmployeeComponent, ConfirmComponent]
})

export class EmployeesModule {

}
