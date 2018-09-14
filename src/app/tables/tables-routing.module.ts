import {NgModule} from '@angular/core';
import {Routes, RouterModule, } from '@angular/router';
import {TablesComponent} from './tables.component';

const route: Routes = [
  {path: '', component: TablesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule]
})

export class TablesRoutingModule{}
