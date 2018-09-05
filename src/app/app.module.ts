import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';


import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatarialModule } from '../modules/matarial/matarial.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';



@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, BrowserAnimationsModule, MaterialModule.forRoot(), FlexLayoutModule, MaterialModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
