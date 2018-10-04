import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {FormControl} from '@angular/forms';

@Component({
  templateUrl: 'add-table.component.html'
})

export class AddTableComponent {

  myControl = new FormControl();
  options: string[] = ['Bahçe', 'Giriş Alanı', 'Kapalı Alan'];

  constructor(public dialogRef: MatDialogRef<AddTableComponent>) {}


  closeDialog(data) {
    this.dialogRef.close(data);
  }
}
