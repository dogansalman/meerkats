import {NgModule} from '@angular/core';
import {UniquePipe} from './unique.pipe';

@NgModule({
  declarations: [UniquePipe],
  exports: [UniquePipe]
})

export class UniqueModule {}


