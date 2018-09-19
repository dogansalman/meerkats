import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
  message: string,
  title: string
}

@Component({
  templateUrl: 'confirm.component.html'
})

export class ConfirmComponent {

  constructor( public dialogRef: MatDialogRef<ConfirmComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  closeDialog(data) {
    this.dialogRef.close(data);
  }
}
