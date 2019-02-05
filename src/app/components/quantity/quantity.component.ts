import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material';


@Component({
  templateUrl: 'quantity.component.html'
})

export class QuantityComponent {

  constructor(public dialogRef: MatDialogRef<QuantityComponent>) { }

}
