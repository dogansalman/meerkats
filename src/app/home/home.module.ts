import {NgModule} from '@angular/core';
import {HomeComponent} from './home.component';
import {AppMaterialModule} from '../app-material.module';
import {CommonModule} from '@angular/common';
import {HomeRoutingModule} from './home-routing.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {SnackbarService} from '../services/snackbar/snackbar.service';

@NgModule({
  imports: [AppMaterialModule, CommonModule, HomeRoutingModule, FlexLayoutModule],
  declarations: [HomeComponent],
  providers: [SnackbarService]
})

export class HomeModule {}
