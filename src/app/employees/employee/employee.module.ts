import {NgModule} from '@angular/core';
import {AppMaterialModule} from '../../modules/material/app-material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {EmployeeComponent} from './employee.component';
import {TranslateModule} from '../../services/translate/translate.module';

@NgModule({
  imports: [AppMaterialModule, FlexLayoutModule, TranslateModule],
  declarations: [EmployeeComponent]
})

export class EmployeeModule {}
