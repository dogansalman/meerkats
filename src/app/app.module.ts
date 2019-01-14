import { NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppMaterialModule } from './app-material.module';
import { Navbar_layoutComponent } from './layouts/navbar_layout/navbar_layout.component';
import { Empty_layoutComponent } from './layouts/empty_layout/empty_layout.component';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';

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
  ],
  providers: [],
  bootstrap: [AppComponent],

})
export class AppModule {}

