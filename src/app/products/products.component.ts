import {Component, AfterViewInit} from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import {ProductInterface} from '../interfaces/product';
import {MatDialog} from '@angular/material';
import {ProductComponent} from './product/product.component';

const ELEMENT_DATA: ProductInterface[] = [
  {
    category: 1,
    image: '',
    name: 'Coca Cola Zero',
    price: 8,
    tax: 8,
    business_id: '1',
  },
  {
    category: 1,
    image: '',
    name: 'Sütlaç',
    price: 12,
    tax: 8,
    business_id: '1',
  },
  {
    category: 1,
    image: '',
    name: 'Cheesecake',
    price: 15,
    tax: 8,
    business_id: '1',
  },
  {
    category: 1,
    image: '',
    name: 'Tavuklu Salata',
    price: 25,
    tax: 8,
    business_id: '1',
  },
  {
    category: 1,
    image: '',
    name: 'Coca Cola Zero',
    price: 8,
    tax: 8,
    business_id: '1',
  },
  {
    category: 1,
    image: '',
    name: 'Sütlaç',
    price: 12,
    tax: 8,
    business_id: '1',
  },
  {
    category: 1,
    image: '',
    name: 'Cheesecake',
    price: 15,
    tax: 8,
    business_id: '1',
  },
  {
    category: 1,
    image: '',
    name: 'Tavuklu Salata',
    price: 25,
    tax: 8,
    business_id: '1',
  },
  {
    category: 1,
    image: '',
    name: 'Coca Cola Zero',
    price: 8,
    tax: 8,
    business_id: '1',
  },
  {
    category: 1,
    image: '',
    name: 'Sütlaç',
    price: 12,
    tax: 8,
    business_id: '1',
  },
  {
    category: 1,
    image: '',
    name: 'Cheesecake',
    price: 15,
    tax: 8,
    business_id: '1',
  },
  {
    category: 1,
    image: '',
    name: 'Tavuklu Salata',
    price: 25,
    tax: 8,
    business_id: '1',
  },
  {
    category: 1,
    image: '',
    name: 'Coca Cola Zero',
    price: 8,
    tax: 8,
    business_id: '1',
  },
  {
    category: 1,
    image: '',
    name: 'Sütlaç',
    price: 12,
    tax: 8,
    business_id: '1',
  },
  {
    category: 1,
    image: '',
    name: 'Cheesecake',
    price: 15,
    tax: 8,
    business_id: '1',
  },
  {
    category: 1,
    image: '',
    name: 'Tavuklu Salata',
    price: 25,
    tax: 8,
    business_id: '1',
  },
];

@Component({
  templateUrl: 'products.component.html'
})
export class ProductsComponent implements AfterViewInit{

  displayedColumns: string[] = ['image', 'name', 'category', 'price'];
  dataSource = ELEMENT_DATA;

  constructor(private spinner: NgxSpinnerService, private dialog: MatDialog) { }

  ngAfterViewInit(): void { this.spinner.hide(); }

  onProduct(): void {
    this.dialog.open(ProductComponent, {width: '450px', height: '600px'});
  }
}
