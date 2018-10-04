import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EmployeesComponent} from './employees.component';

const route: Routes = [{
  path: '',
  component: EmployeesComponent
}];

@NgModule({
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule {}
