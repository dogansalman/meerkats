import {NgModule} from '@angular/core';
import {TranslatePipe} from '../../services/translate/translate.pipe';

@NgModule({
  declarations: [TranslatePipe],
  exports: [TranslatePipe]
})

export class PipesModule {}
