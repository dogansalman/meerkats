import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {AuthService} from '../../services/auth/auth.service';
import {MatSnackBar} from '@angular/material';
import {TranslatePipe} from '../../services/translate/translate.pipe';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'login-forgot',
  templateUrl: 'forgot.component.html',
  providers: [TranslatePipe, AuthService]
  })

export class ForgotComponent {
  public formGrp: FormGroup;

  constructor( public dialogRef: MatDialogRef<ForgotComponent>,
               private snack: MatSnackBar,
               private translater: TranslatePipe,
               private fb: FormBuilder,
               private spinner: NgxSpinnerService,
               private auth: AuthService) {

    this.formGrp = fb.group({email: [null, Validators.email]});
  }

  onSendResetEmail(): void {
    if (!this.formGrp.valid) { return; }
    this.spinner.show();
    this.auth.forgot(this.formGrp.value.email).then(() => {
      this.dialogRef.close();
      this.spinner.hide();
      this.snack.open(this.translater.transform('auth/user-send-reset'), this.translater.transform('ok_button'), {duration: 3000, panelClass: 'snack_success'});
    }).catch((err) => {
      this.spinner.hide();
      this.snack.open(this.translater.transform(err.code), this.translater.transform('ok_button'), {duration: 3000, panelClass: 'snack_error'});
    });
  }
}
