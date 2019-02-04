import {NgModule} from '@angular/core';
import {HomeComponent} from './home.component';
import {AppMaterialModule} from '../modules/material/app-material.module';
import {CommonModule} from '@angular/common';
import {HomeRoutingModule} from './home-routing.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {SnackbarService} from '../services/snackbar/snackbar.service';
import {OrderModule} from './order/order.module';
import {OrderComponent} from './order/order.component';
import {TranslateModule} from '../services/translate/translate.module';
import {ConfirmComponent} from '../components/confirm/confirm.component';

@NgModule({
  imports: [AppMaterialModule, CommonModule, HomeRoutingModule, FlexLayoutModule, OrderModule, TranslateModule],
  declarations: [HomeComponent],
  providers: [SnackbarService],
  entryComponents: [OrderComponent, ConfirmComponent]
})

export class HomeModule {
  constructor() { }
}
