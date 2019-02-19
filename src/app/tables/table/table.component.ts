import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Table} from '../../models/table/table';

@Component({
  templateUrl: 'table.component.html'
})

export class TableComponent {

  public frmGrp: FormGroup;
  public _table: Table;

  options: string[] = ['Bahçe', 'Giriş Alanı', 'Kapalı Alan'];

  constructor(public dialogRef: MatDialogRef<TableComponent>, @Inject(MAT_DIALOG_DATA) public data: Table, private formBuilder: FormBuilder) {

    this.frmGrp = this.formBuilder.group({
      'location': [null, Validators.required],
      'chair': [null, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      'no': [null, [Validators.required, Validators.minLength(1), Validators.maxLength(20), Validators.pattern('[0-9]')]],
      'barcode': [null, [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      'business_id': [null]
    });
    if (data) {
      this._table = (data as Table);
      this.frmGrp.patchValue(data);
    }
  }


  changeOrCrate(): void {
   // if (!this.frmGrp.valid) { alert('is not valid'); }

    if (this._table) {
      /*Update*/
       console.log('update...', this.frmGrp.value, 'key', this._table.$key);
       this.dialogRef.close();
       return;
    }

    /* Create */
    console.log('create...', this.frmGrp.value);

    this.dialogRef.close();
    return;

  }
 }
