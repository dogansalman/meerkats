import {NgModule} from '@angular/core';
import {AppMaterialModule} from '../../modules/material/app-material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {PasswordComponent} from './password.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '../../services/translate/translate.module';

@NgModule({
  imports: [AppMaterialModule, FlexLayoutModule, FormsModule, ReactiveFormsModule, TranslateModule],
  declarations: [PasswordComponent]
})
export class PasswordModule { }
