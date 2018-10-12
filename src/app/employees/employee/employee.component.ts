import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

//example data
export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  templateUrl: 'employee.component.html'
})

export class EmployeeComponent {
  constructor(public dialogRef: MatDialogRef<EmployeeComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
}
