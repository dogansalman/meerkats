import {NgModule} from '@angular/core';
import {AppMaterialModule} from '../../app-material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {EmployeeComponent} from './employee.component';

@NgModule({
  imports: [AppMaterialModule, FlexLayoutModule],
  declarations: [EmployeeComponent]
})

export class EmployeeModule {}
