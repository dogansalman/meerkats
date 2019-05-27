import {Component, OnInit, AfterViewInit, ViewEncapsulation} from '@angular/core';
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
import {ConfirmComponent} from '../components/confirm/confirm.component';

@Component({
  templateUrl: 'products.component.html',
  styleUrls: ['products.component.scss'],
  selector: "meerkats-products",
  providers: [ProductService, TranslatePipe],
  encapsulation: ViewEncapsulation.None
})
export class ProductsComponent implements OnInit, AfterViewInit {

  products: Observable<Product[]>;
  public openedProductDetail = false;
  categories: any[];

  constructor(private spinner: NgxSpinnerService, private dialog: MatDialog, private productServ: ProductService, private snack: MatSnackBar, private translater: TranslatePipe) { }

  ngOnInit(): void {
    /* Get locations */
    this.productServ.get().snapshotChanges().pipe(keyVal(), tap(a => this.categories = this.productServ.getCategories(a))).subscribe();
    /* Get tables */
    this.products  = this.productServ.get().snapshotChanges().pipe(keyVal(), tap(() => this.spinner.hide()));
  }
  ngAfterViewInit(): void {
    /* Hide spinner when empty data */
    this.products.subscribe(d =>  d.length === 0 ? this.spinner.hide() : null);
  }
  onProduct(product: Product = null): void {
    if (this.openedProductDetail) { return; }
    this.openedProductDetail = true;
    const dialogRef = this.dialog.open(ProductComponent, {width: '500px', height: '750px', data: {product: product, categories: this.categories}});

    dialogRef.afterClosed().subscribe(result => {
      this.openedProductDetail = false;
      if (!result || result === 'undefined' || result == null) { return; }
      if (result === true) {
        this.snack.open(this.translater.transform('successful'), this.translater.transform('ok_button'), {duration: 3000, panelClass: 'snack_success'});
        return;
      }
      this.snack.open(this.translater.transform('unsuccessful'), this.translater.transform('ok_button'), {duration: 3000, panelClass: 'snack_error'});
    });
  }
  onDelete(product: Product): void {
    this.openedProductDetail = true;
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '450px',
      data: {message: this.translater.transform('sure_message'), title: this.translater.transform('sure_message_title')}
    });

    dialogRef.componentInstance.onSelect.subscribe(result => {
      if (!result) { return; }
      this.productServ.delete(product).then(() => {
        this.snack.open(this.translater.transform('successful'), this.translater.transform('ok_button'), {duration: 3000, panelClass: 'snack_success'});
      }).catch(err => {
        this.snack.open(this.translater.transform('unsuccessful'), this.translater.transform('ok_button'), {duration: 3000, panelClass: 'snack_error'});
        console.log('Debug:' + err);
      });
    });

    dialogRef.afterClosed().subscribe(() => { dialogRef.componentInstance.onSelect.unsubscribe();  this.openedProductDetail = false;  });
  }
}
