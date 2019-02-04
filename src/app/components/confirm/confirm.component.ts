import {Component, Inject, EventEmitter, Output} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
  message: string,
  title: string;
}

@Component({
  templateUrl: 'confirm.component.html'
})

export class ConfirmComponent {

  @Output() onSelect = new EventEmitter();

  constructor( public dialogRef: MatDialogRef<ConfirmComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onSelection(value: boolean) {
    this.dialogRef.close();
    this.onSelect.emit(value);
  }
}
