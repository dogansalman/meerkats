import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Product} from '../../models/product/product';
import {ProductService} from '../../models/product/product.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {StorageService} from '../../services/storage/storage.service';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'products-product',
  templateUrl: 'product.component.html',
  providers: [ProductService, StorageService]
})

export class ProductComponent implements OnInit {
  public formGrp: FormGroup;
  public _product: Product;
  public _categories: any[];
  public _file: File;
  public _image: any = null;


  constructor(private dialogRef: MatDialogRef<ProductComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private fb: FormBuilder,
              private productServ: ProductService,
              private spinner: NgxSpinnerService,
              private storage: StorageService,
              private auth: AuthService) {
    /* Form group */
    this.formGrp = this.fb.group(
      {
        $key: [null],
        name: [null, [Validators.required, Validators.maxLength(255), Validators.pattern('^[a-züğışçöA-ZİĞÜŞÇÖ0-9 ]*$')]],
        price: [null, [Validators.required]],
        tax: [null, [Validators.pattern('[0-9]*')]],
        category: [null, [Validators.required, Validators.maxLength(120), Validators.pattern('^[a-züğışçöA-ZİĞÜŞÇÖ0-9 ]*$')]],
        image: [null],
      }
    );

    /* set categories from products*/
    this._categories = data.categories;

    /* set product */
    if (data.product) {
      this._product = data.product;
      this.formGrp.patchValue(data.product);
    }

  }

  ngOnInit(): void { }

  changeOrCrate(): void {
    if (!this.formGrp.valid) { return; }
    this.spinner.show();

    if (this._product) {
      /*Update*/
      this.productServ.update(this.formGrp.value as Product, this._file)
        .then(() => {
          this.spinner.hide();
          this.dialogRef.close(true);
        }).catch((err) => this.dialogRef.close(err));
      return;
    }

    /* Create */
    this.productServ.create(this.formGrp.value as Product, this._file).then(() => {
      this.dialogRef.close(true);
      this.spinner.hide();
    }).catch((e) => {
      this.dialogRef.close(e);
      this.spinner.hide(); });
  }

  photoSelected(event) {
    this.spinner.show();
    if (!event.target.files[0]) { return; }
    if (!(new RegExp('(' + ['.jpg', '.jpeg', '.png', '.bmp'].join('|').replace(/\./g, '\\.') + ')$')).test(event.target.files[0].name)) {
      this._file = null;
      return;
    }
    this._file = event.target.files[0];

    this.storage.readImageFromFile(this._file).then(results => {
      this._image = results;
      this.formGrp.patchValue({'image': this._image});
      this.spinner.hide();
    }).catch(() => this.spinner.hide());

  }
  deletePhoto(uploader: HTMLInputElement): void {
    this.formGrp.patchValue({'image': null});
    this._image = null;
    this._file = null;
    uploader.value = null;
  }

}

