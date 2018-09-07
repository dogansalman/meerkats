import { NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HeaderComponent } from './layouts/header/header.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [BrowserAnimationsModule, AppRoutingModule, FormsModule,  NgxSpinnerModule, FlexLayoutModule],
  providers: [],
  bootstrap: [AppComponent],

})
export class AppModule {}
