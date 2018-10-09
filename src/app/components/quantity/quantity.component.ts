import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
  message: string,
  title: string
}

@Component({
  templateUrl: 'quantity.component.html'
})

export class QuantityComponent {

  constructor(public dialogRef: MatDialogRef<QuantityComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  closeDialog(data){
    this.dialogRef.close();
  }
}
