import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PersonComponent} from './person.component';

const route: Routes = [{
  path: '',
  component: PersonComponent
}];

@NgModule({
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule]
})
export class PersonRoutingModule {}
