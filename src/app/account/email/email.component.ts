import {Component} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {TranslatePipe} from '../../services/translate/translate.pipe';
import {MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {NgxSpinnerService} from 'ngx-spinner';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConfirmComponent} from '../../components/confirm/confirm.component';

@Component({
  templateUrl: 'email.component.html',
  providers: [AuthService, TranslatePipe]
})

export class EmailComponent {
  public frmGroup: FormGroup;
  constructor(private auth: AuthService, private snack: MatSnackBar,
              private spinner: NgxSpinnerService,
              private dialog: MatDialog,
              private translater: TranslatePipe,
              private dialogRef: MatDialogRef<EmailComponent>,
              private fb: FormBuilder) {
    this.frmGroup = fb.group({
    email: [null, [Validators.required, Validators.email, Validators.maxLength(255)]]
    });
    this.auth.afAuth.user.subscribe(u => {
      this.frmGroup.patchValue({email: u.email});
    });
  }

  onChangeEmail(): void {
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
