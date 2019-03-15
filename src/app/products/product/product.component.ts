import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Product} from '../../models/product/product';
import {ProductService} from '../../models/product/product.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  templateUrl: 'product.component.html',
  providers: [ProductService]
})

export class ProductComponent implements OnInit {
  public formGrp: FormGroup;
  public _product: Product;
  public _categories: any[];

  constructor(private dialogRef: MatDialogRef<ProductComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private fb: FormBuilder,
              private productServ: ProductService,
              private spinner: NgxSpinnerService) {
    /* Form group */
    this.formGrp = this.fb.group(
      {
        $key: [null],
        name: [null, Validators.required],
        price: [null, Validators.required],
        tax: [null, Validators.pattern('[0-9]*')],
        category: [null, Validators.required],
        image: [null],
        business_id: [null],
      }
    );

    /* Set product & categories */
    console.log(data)
    if (data.product) {
      this._product = data.product;
      this._categories = data.categories;
      this.formGrp.patchValue(data.product);
    }

  }

  ngOnInit(): void { }

  changeOrCrate(): void {
    // TODO Validations Message
    if (!this.formGrp.valid) {
      console.log(this.formGrp.controls);
      return;
    }


    if (this._product) {
      /*Update*/
      this.spinner.show();
      this.productServ.update(this.formGrp.value)
        .then(() => {
          this.spinner.hide();
          this.dialogRef.close(true);
        }).catch((err) => this.dialogRef.close(err));
      return;
    }

    /* Create */
    const data = this.formGrp.value;
    delete data.$key;
    data.business_id = 'dummy'; // TODO Get Auth Key

    this.productServ.create(this.formGrp.value).then(() => this.dialogRef.close(true)).catch((e) => this.dialogRef.close(e));
  }


}
