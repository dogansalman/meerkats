import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppMaterialModule} from '../app-material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {EmployeesComponent} from './employees.component';
import {EmployeesRoutingModule} from './employees-routing.module';

@NgModule({
  imports: [AppMaterialModule, FlexLayoutModule, CommonModule, EmployeesRoutingModule],
  declarations: [EmployeesComponent]
})

export class EmployeesModule {

}
