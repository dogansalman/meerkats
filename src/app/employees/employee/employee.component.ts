import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Employee} from '../../models/employee/employee';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EmployeeService} from '../../models/employee/employee.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {PermissionKeys} from '../../services/permissionsGuard/permissionGuard.service';

@Component({
  templateUrl: 'employee.component.html',
  providers: [EmployeeService]
})

export class EmployeeComponent implements OnInit {

  public _employee: Employee = null;
  public frmGrp: FormGroup;
  public permissions = PermissionKeys;
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
        name: [null, [Validators.required, Validators.maxLength(120), Validators.pattern('^[a-züğışçöA-ZİĞÜŞÇÖ0-9 ]*$')]],
        lastname: [null, [Validators.required, Validators.maxLength(120), Validators.pattern('^[a-züğışçöA-ZİĞÜŞÇÖ0-9 ]*$')]],
        permissions: [null, Validators.required],
        password: [null, [Validators.required, Validators.maxLength(255)]],
        username: [null, [Validators.required, Validators.maxLength(255), Validators.pattern('^[a-züğışçöA-ZİĞÜŞÇÖ0-9 ]*$')]]
      }
    );
  }

  ngOnInit(): void {
    if (this._employee) { this.frmGrp.patchValue(this._employee); }

  }
  onCreateOrUpdate(): void {
    if (!this.frmGrp.valid) { return; }
    this.spinner.show();

    if (this._employee) {
      /*Update*/
      this.employeeServ.update(this.frmGrp.value).then(() => {
        this.dialogRef.close(true);
        this.spinner.hide();
      }).catch(() => {
        this.spinner.hide();
        this.dialogRef.close(false);
      });
      return;
    }

    /* Create */
   this.employeeServ.create(this.frmGrp.value as Employee).then(() => {
     this.dialogRef.close(true);
     this.spinner.hide();
   }).catch(() => {
     this.spinner.hide();
     this.dialogRef.close(false);
   });
  }
}

