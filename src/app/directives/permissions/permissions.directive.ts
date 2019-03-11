import {Directive, ElementRef} from '@angular/core';
import {Renderer2} from '@angular/core';
import {TranslatePipe} from '../../services/translate/translate.pipe';

@Directive({
  selector: '[appPermission]',
  providers: [TranslatePipe]
})
export class PermissionsDirective {
  constructor(el: ElementRef, private ren: Renderer2, private translater: TranslatePipe) {
    this.ren.removeChild(el, el);
  }
}
