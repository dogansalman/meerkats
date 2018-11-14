import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {FormControl} from '@angular/forms';

@Component({
  templateUrl: 'table.component.html'
})

export class TableComponent {

  myControl = new FormControl();
  options: string[] = ['Bahçe', 'Giriş Alanı', 'Kapalı Alan'];

  constructor(public dialogRef: MatDialogRef<TableComponent>) {}


  closeDialog(data) {
    this.dialogRef.close(data);
  }
}
