import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Table} from '../../models/table/table';
import {TableService} from '../../models/table/table.service';
import {NgxSpinnerService} from 'ngx-spinner';


@Component({
  templateUrl: 'table.component.html',
  providers: [TableService]
})

export class TableComponent implements  OnInit {

  /* Properties*/
  public frmGrp: FormGroup;
  public _table: Table;
  locations: string[] = [];


  constructor(
    public dialogRef: MatDialogRef<TableComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private tableServ: TableService,
    private spinner: NgxSpinnerService
  )  {

    /* Set selected Table */
    this._table = data.table as Table;
    /* Set locations */
    this.locations = this.data.locations;
    /* Create form group validations */
    this.frmGrp = this.formBuilder.group({
      '$key': [null],
      'location': [null, [Validators.required, Validators.maxLength(120)]],
      'chair': [null, [Validators.required, Validators.pattern('[0-9]*')]],
      'no': [null, [Validators.required, Validators.maxLength(120), Validators.pattern('[a-zA-Z 0-9]*')]],
      'barcode': [null],
    });

  }

  ngOnInit(): void {
    /* Patch table value to formGroup*/
    if (this._table) { this.frmGrp.patchValue(this._table); }
  }

  onCreateOrUpdate(): void {

    if (!this.frmGrp.valid) { return; }

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
    this.tableServ.create(this.frmGrp.value as Table).then(() => this.dialogRef.close(true)).catch((e) => this.dialogRef.close(e));
  }
 }
