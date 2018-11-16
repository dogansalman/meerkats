import {Component, AfterViewInit} from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import {productInterface} from '../interfaces/product';

const ELEMENT_DATA: productInterface[] = [
  {
    category: 1,
    image: '',
    name: 'Coca Cola Zero',
    price: 8
  },
  {
    category: 1,
    image: '',
    name: 'Sütlaç',
    price: 12
  },
  {
    category: 1,
    image: '',
    name: 'Cheesecake',
    price: 15
  },
  {
    category: 1,
    image: '',
    name: 'Tavuklu Salata',
    price: 25
  },
  {
    category: 1,
    image: '',
    name: 'Coca Cola Zero',
    price: 8
  },
  {
    category: 1,
    image: '',
    name: 'Sütlaç',
    price: 12
  },
  {
    category: 1,
    image: '',
    name: 'Cheesecake',
    price: 15
  },
  {
    category: 1,
    image: '',
    name: 'Tavuklu Salata',
    price: 25
  },
  {
    category: 1,
    image: '',
    name: 'Coca Cola Zero',
    price: 8
  },
  {
    category: 1,
    image: '',
    name: 'Sütlaç',
    price: 12
  },
  {
    category: 1,
    image: '',
    name: 'Cheesecake',
    price: 15
  },
  {
    category: 1,
    image: '',
    name: 'Tavuklu Salata',
    price: 25
  },
  {
    category: 1,
    image: '',
    name: 'Coca Cola Zero',
    price: 8
  },
  {
    category: 1,
    image: '',
    name: 'Sütlaç',
    price: 12
  },
  {
    category: 1,
    image: '',
    name: 'Cheesecake',
    price: 15
  },
  {
    category: 1,
    image: '',
    name: 'Tavuklu Salata',
    price: 25
  },
];

@Component({
  templateUrl: 'products.component.html'
})
export class ProductsComponent implements AfterViewInit{

  displayedColumns: string[] = ['image', 'name', 'category', 'price'];
  dataSource = ELEMENT_DATA;

  constructor(private spinner: NgxSpinnerService) { }

  ngAfterViewInit(): void { this.spinner.hide() }
}
