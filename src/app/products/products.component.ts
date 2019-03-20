import {Component, OnInit} from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import {MatDialog} from '@angular/material';
import {ProductComponent} from './product/product.component';
import {ProductService} from '../models/product/product.service';
import {Product} from '../models/product/product';
import {MatSnackBar} from '@angular/material';
import {TranslatePipe} from '../services/translate/translate.pipe';
import {Observable} from 'rxjs/internal/Observable';
import {keyVal} from '../operators/keyVal/keyVal';
import {tap} from 'rxjs/operators';

@Component({
  templateUrl: 'products.component.html',
  providers: [ProductService, TranslatePipe]
})
export class ProductsComponent implements OnInit {

  displayedColumns: string[] = ['image', 'name', 'category', 'price'];
  products: Observable<Product[]>;
  categories: any[];


  constructor(private spinner: NgxSpinnerService, private dialog: MatDialog, private productServ: ProductService, private snack: MatSnackBar, private translater: TranslatePipe) { }

  ngOnInit(): void {
    /* Get locations */
    this.productServ.get().snapshotChanges().pipe(keyVal(), tap(a => this.categories = this.productServ.getCategories(a))).subscribe();
    /* Get tables */
    this.products  = this.productServ.get().snapshotChanges().pipe(keyVal(), tap(() => this.spinner.hide()));
  }

  onProduct(product: Product = null): void {
    const dialogRef = this.dialog.open(ProductComponent, {width: '450px', height: '600px', data: {product: product, categories: this.categories}});

    dialogRef.afterClosed().subscribe(result => {
      if (!result || result === 'undefined' || result == null) { return; }
      if (result === true) {
        this.snack.open(this.translater.transform('successful'), this.translater.transform('ok_button'), {duration: 3000, panelClass: 'snack_success'});
        return;
      }
      this.snack.open(this.translater.transform('unsuccessful'), this.translater.transform('ok_button'), {duration: 3000, panelClass: 'snack_error'});
    });
  }
}
