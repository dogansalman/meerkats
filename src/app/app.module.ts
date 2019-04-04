import {APP_INITIALIZER, NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule} from './modules/routing/app-routing.module';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppMaterialModule } from './modules/material/app-material.module';
import { NavbarLayoutComponent } from './layouts/navbarLayout/navbarLayout.component';
import { EmptyLayoutComponent } from './layouts/emptyLayout/emptyLayout.component';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';
import { AgmCoreModule } from '@agm/core';
import { TranslateService } from './services/translate/translate.service';
import { TranslateModule } from './services/translate/translate.module';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { StorageService } from './services/storage/storage.service';
import {AngularFireStorageModule} from '@angular/fire/storage';

export function setupTranslateFactory(service: TranslateService): Function {
  return () => service.use(localStorage.getItem('lang-meerkats') || 'tr');
}

@NgModule({
  declarations: [AppComponent, NavbarLayoutComponent, EmptyLayoutComponent],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    NgxSpinnerModule,
    FlexLayoutModule,
    AppMaterialModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase, 'meerkats'),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AgmCoreModule.forRoot({
      apiKey: environment.mapKey
    }),
    TranslateModule,
    AngularFireStorageModule,
  ],
  providers: [
    TranslateService,
    StorageService,
    {
    provide: APP_INITIALIZER,
    useFactory: setupTranslateFactory,
    deps: [TranslateService],
    multi: true
    }
  ],
  bootstrap: [AppComponent],

})
export class AppModule {}
