import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, BrowserAnimationsModule, FlexLayoutModule],
  exports: [MatButtonModule, MatCheckboxModule, BrowserAnimationsModule, FlexLayoutModule]
})
export class MatarialModule {}

