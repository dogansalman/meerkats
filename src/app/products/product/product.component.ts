import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Product} from '../../models/product/product';
import {ProductService} from '../../models/product/product.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {StorageService} from '../../services/storage/storage.service';
import {finalize, tap} from 'rxjs/operators';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  templateUrl: 'product.component.html',
  providers: [ProductService, StorageService]
})

export class ProductComponent implements OnInit {
  public formGrp: FormGroup;
  public _product: Product;
  public _categories: any[];

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
        name: [null, [Validators.required, Validators.maxLength(255)]],
        price: [null, [Validators.required]],
        tax: [null, [Validators.pattern('[0-9]*')]],
        category: [null, [Validators.required, Validators.maxLength(120)]],
        image: [null],
      }
    );

    this._categories = data.categories;

    /* Set product */
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
      this.productServ.update(this.formGrp.value as Product)
        .then(() => {
          this.spinner.hide();
          this.dialogRef.close(true);
        }).catch((err) => this.dialogRef.close(err));
      return;
    }

    /* Create */
    this.productServ.create(this.formGrp.value as Product).then(() => {
      this.dialogRef.close(true);
      this.spinner.hide();
    }).catch((e) => {
      this.dialogRef.close(e);
      this.spinner.hide(); });
  }

  upload(event): void {
    //TODO create-update iki farklı şekildede fotoğraf eklenmesi düzenlenecek.
    this.storage.pushUpload(event.target.files[0], 'product/' + this.auth.user.uid ).snapshotChanges().pipe(
      finalize(async() => {
        this.storage.ref.getDownloadURL().subscribe(datam => console.log(datam));
      })
    ).subscribe();

  }

}

