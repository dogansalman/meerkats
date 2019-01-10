import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {DialogData} from '../forgot/forgot.component';

@Component({
    templateUrl: './register.component.html'
})
export class RegisterComponent {

  constructor(public dialogRef: MatDialogRef<RegisterComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}
