import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Employee} from '../../models/employee/employee';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EmployeeService} from '../../models/employee/employee.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  templateUrl: 'employee.component.html',
  providers: [EmployeeService]
})

export class EmployeeComponent implements OnInit {

  public _employee: Employee = null;
  public frmGrp: FormGroup;
  constructor(public dialogRef: MatDialogRef<EmployeeComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private fb: FormBuilder,
              private employeeServ: EmployeeService,
              private spinner: NgxSpinnerService) {

    /* Set employee */
    this._employee = data as Employee;
    /* Form Validations */
    this.frmGrp = this.fb.group(
      {
        $key: [null],
        name: [null, Validators.required],
        lastname: [null, Validators.required],
        permissions: [null, Validators.required],
        business_id: [null],
        password: [null],
        username: [null, Validators.required]
      }
    );
  }

  ngOnInit(): void {
    if (this._employee) { this.frmGrp.patchValue(this._employee); }
  }
  onCreateOrUpdate(): void {
    // TODO Validations Message
    if (!this.frmGrp.valid) { return; }

    if (this._employee) {
      /*Update*/
      this.spinner.show();
      this.employeeServ.update(this.frmGrp.value)
        .then(() => {
          this.spinner.hide();
          this.dialogRef.close(true);
        }).catch((err) => this.dialogRef.close(err));
      return;
    }

    /* Create */
    const data = this.frmGrp.value;
    delete data.$key;
    data.business_id = 'dummy'; // TODO Get Auth Key

    this.employeeServ.create(this.frmGrp.value).then(() => this.dialogRef.close(true)).catch((e) => this.dialogRef.close(e));
  }
}

