import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {LocationComponent} from './location.component'
import {AppMaterialModule} from '../../modules/material/app-material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AgmCoreModule} from '@agm/core';
import {TranslateModule} from './../../services/translate/translate.module';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
    imports: [AppMaterialModule, FlexLayoutModule, AgmCoreModule, TranslateModule, CommonModule, HttpClientModule],
    declarations: [LocationComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: []
})
export class LocationModule {
    constructor() {}
}