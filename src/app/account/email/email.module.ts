import {NgModule} from '@angular/core';
import {AppMaterialModule} from '../../modules/material/app-material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EmailComponent} from './email.component';
import {TranslateModule} from '../../services/translate/translate.module';

@NgModule({
  imports: [AppMaterialModule, FlexLayoutModule, FormsModule, ReactiveFormsModule, TranslateModule],
  declarations: [EmailComponent]
})
export class EmailModule {}
