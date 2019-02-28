import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Table} from '../../models/table/table';
import {TableServices} from '../../models/table/table.services';
import {NgxSpinnerService} from 'ngx-spinner';


@Component({
  templateUrl: 'table.component.html',
  providers: [TableServices]
})

export class TableComponent implements  OnInit {

  /* Properties*/
  public frmGrp: FormGroup;
  public _table: Table;
  options: string[] = [];


  constructor(
    public dialogRef: MatDialogRef<TableComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Table,
    private formBuilder: FormBuilder,
    private tableServ: TableServices,
    private spinner: NgxSpinnerService
  )  {
    /* Create form group validations */
    this.frmGrp = this.formBuilder.group({
      $key: [null],
      'location': [null, Validators.required],
      'chair': [null, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      'no': [null, [Validators.required, Validators.minLength(1), Validators.maxLength(20), Validators.pattern('[0-9]')]],
      'barcode': [null, [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      'business_id': [null]
    });

    /* Set selected Table */
    this._table = data;

  }

  ngOnInit(): void {
    /* Patch table value to formGroup*/
    if (this._table) { this.frmGrp.patchValue(this._table); }
  }

  changeOrCrate(): void {
   // if (!this.frmGrp.valid) { alert('is not valid'); }

    if (this._table) {
      /*Update*/
      this.spinner.show();
      this.tableServ.update(this.frmGrp.value)
        .then(() => {
          this.spinner.hide();
          this.dialogRef.close(true);
        }).catch((err) => this.dialogRef.close(err));
       return;
    }

    /* Create */
    console.log('create...', this.frmGrp.value);

    this.dialogRef.close();
    return;

  }
 }
