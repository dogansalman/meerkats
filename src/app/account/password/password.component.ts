import {Component} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {ConfirmComponent} from '../../components/confirm/confirm.component';
import {MatDialog, MatDialogRef} from '@angular/material';
import {TranslatePipe} from '../../services/translate/translate.pipe';
import {NgxSpinnerService} from 'ngx-spinner';
import {MatSnackBar} from '@angular/material';

@Component({
  templateUrl: 'password.component.html',
  selector: 'account-password',
  providers: [TranslatePipe, AuthService]
})

export class PasswordComponent {
  public frmGroup: FormGroup;
  constructor(private auth: AuthService, private fb: FormBuilder,
              private dialogRef: MatDialogRef<PasswordComponent>,
              private dialog: MatDialog,
              private snack: MatSnackBar,
              private translater: TranslatePipe,
              private spinner: NgxSpinnerService) {

    this.frmGroup = this.fb.group({
      password: [null, [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
      password_reply: [null, [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
    });
  }

  onChangePassword(): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '450px',
      data: {message: this.translater.transform('sure_message'), title: this.translater.transform('sure_message_title') }
    });

    dialogRef.componentInstance.onSelect.subscribe(result => {
      if (result && this.frmGroup.valid && this.frmGroup.value.password === this.frmGroup.value.password_reply) {
        this.spinner.show();
        this.auth.resetPassword(this.frmGroup.value.password).then(() => {
          this.dialogRef.close();
          this.spinner.hide();
          this.snack.open(this.translater.transform('successful'), this.translater.transform('ok_button'), {duration: 3000, panelClass: 'snack_success'});
        }).catch((err) => {
          this.spinner.hide();
          console.log(err);
          this.snack.open(this.translater.transform('unsuccessful'), this.translater.transform('ok_button'), {duration: 3000, panelClass: 'snack_error'});
        });
      }
    });
    dialogRef.afterClosed().subscribe(() => dialogRef.componentInstance.onSelect.unsubscribe());
  }
}
