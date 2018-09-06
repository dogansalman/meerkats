import { NgModule, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxSpinnerService } from 'ngx-spinner';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserAnimationsModule, AppRoutingModule, FormsModule, FlexLayoutModule, NgxSpinnerModule],
  providers: [],
  bootstrap: [AppComponent],

})
export class AppModule {}
