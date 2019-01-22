import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Injectable()

export class SnackbarService {

  constructor(private snackbar: MatSnackBar) { }

  public show(message: string, action: string, typeClass) {
   return this.snackbar.open(message, action, {
      duration: 4000,
      horizontalPosition: 'end',
      panelClass: typeClass
    });
  }
}
