import {APP_INITIALIZER, NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule} from './modules/routing/app-routing.module';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppMaterialModule } from './modules/material/app-material.module';
import { Navbar_layoutComponent } from './layouts/navbar_layout/navbar_layout.component';
import { Empty_layoutComponent } from './layouts/empty_layout/empty_layout.component';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';
import { AgmCoreModule } from '@agm/core';
import { TranslateService } from './services/translate/translate.service';


export function setupTranslateFactory(service: TranslateService): Function {
  return () => service.use('tr');
}

@NgModule({
  declarations: [AppComponent, Navbar_layoutComponent, Empty_layoutComponent],
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
    AgmCoreModule.forRoot({
      apiKey: environment.mapKey
    })
  ],
  providers: [
    TranslateService,
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
