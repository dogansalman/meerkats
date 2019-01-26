import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ForgotComponent} from './forgot.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AppMaterialModule} from '../../modules/material/app-material.module';
import {PipesModule} from '../../modules/shared-pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    AppMaterialModule,
    PipesModule
  ],
  declarations: [ForgotComponent],
})

export class ForgotModule {}
