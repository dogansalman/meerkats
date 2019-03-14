import {Component, OnInit} from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import {MatDialog} from '@angular/material';
import {ProductComponent} from './product/product.component';
import {ProductService} from '../models/product/product.service';
import {Product} from '../models/product/product';

@Component({
  templateUrl: 'products.component.html',
  providers: [ProductService]
})
export class ProductsComponent implements OnInit {

  displayedColumns: string[] = ['image', 'name', 'category', 'price'];
  products: Product[];
  categories: any[];

  constructor(private spinner: NgxSpinnerService, private dialog: MatDialog, private productServ: ProductService) { }

  ngOnInit(): void {
    this.productServ.get().then(data => {
      /* Set products */
      this.products = data as Product[];
      /* Get categories from products */
      this.categories = this.productServ.getCategories(this.products);
    }).then(() => this.spinner.hide());
  }

  onProduct(): void {
    this.dialog.open(ProductComponent, {width: '450px', height: '600px'});
  }
}
