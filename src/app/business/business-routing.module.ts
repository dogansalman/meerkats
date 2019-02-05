import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BusinessComponent} from './business.component';

const route: Routes = [
  {
    path: '',
    component: BusinessComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule]
})
export class BusinessRoutingModule {}
