import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {BussinessTypeServices} from '../../models/bussinessType/bussinessType.services';
import {HttpRequestService} from '../../services/httpRequest/httpRequest.service';
import {environment} from '../../../environments/environment.prod';
import {Account} from '../../models/account/account';
import {AccountService} from '../../models/account/account.service';
import {TranslatePipe} from '../../services/translate/translate.pipe';
import {MatDialogRef, MatSnackBar} from '@angular/material';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
    selector: 'login-register',
    templateUrl: './register.component.html',
    providers: [BussinessTypeServices, HttpRequestService, AccountService, TranslatePipe]
})

export class RegisterComponent implements OnInit {

  public BusinessTypeList: string[];
  public formGrp: FormGroup;

  constructor(public db: AngularFireDatabase,
              public dialogRef: MatDialogRef<RegisterComponent>,
              private translater: TranslatePipe,
              private snack: MatSnackBar,
              private fb: FormBuilder,
              private router: Router,
              private spinner: NgxSpinnerService,
              private accServ: AccountService) { }

  ngOnInit() {
    this.formGrp = this.fb.group({
      business_name: [null, [Validators.required, Validators.maxLength(255)]],
      email: [null, [Validators.required, Validators.email, Validators.maxLength(255)]],
      business_type: [null, [Validators.required, Validators.maxLength(120)]],
      password: [null, [Validators.required, Validators.maxLength(255)]],
      passwordreply: [null, [Validators.required, Validators.maxLength(255)]]
    });
    this.BusinessTypeList = environment.business_types;
  }


  onRegister(): void {
    if (!this.formGrp.valid) { return; }
    this.spinner.show();
    this.accServ.create(Object.assign(new Account(), this.formGrp.value), this.formGrp.value.password).then(() => this.router.navigateByUrl('/home'))
      .then(() => { this.dialogRef.close(); this.spinner.hide(); })
      .catch(err => {
        this.spinner.hide();
        this.snack.open(this.translater.transform(err.code), this.translater.transform('ok_button'), {duration: 3000, panelClass: 'snack_error'});
    });
  }


}

