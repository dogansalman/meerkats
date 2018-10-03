import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppMaterialModule} from '../app-material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {PersonComponent} from './person.component';
import {PersonRoutingModule} from './person-routing.module';

@NgModule({
  imports: [AppMaterialModule, FlexLayoutModule, CommonModule, PersonRoutingModule],
  declarations: [PersonComponent]
})

export class PersonModule {

}
