import {Component} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  templateUrl: 'product.component.html'
})

export class ProductComponent {
  constructor(private matDialogRef: MatDialogRef<ProductComponent>) {

  }
}
