import {Component, Inject, ViewEncapsulation} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  templateUrl: 'forgot.component.html'
  })

export class ForgotComponent{
  constructor( public dialogRef: MatDialogRef<ForgotComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  closeDialog(data) {
    this.dialogRef.close(data);
  }
}
