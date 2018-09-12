import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {KitchenComponent} from './kitchen.component';

const route: Routes = [
  {
    path: '',
    component: KitchenComponent
  }
]
@NgModule({
  imports:[RouterModule.forChild(route)],
  exports:[RouterModule]
})
export class KitchenRoutingModule{}
