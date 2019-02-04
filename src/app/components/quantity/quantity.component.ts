import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


@Component({
  templateUrl: 'quantity.component.html'
})

export class QuantityComponent {

  constructor(public dialogRef: MatDialogRef<QuantityComponent>) { }

}
