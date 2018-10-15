import {Component, AfterViewInit} from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  templateUrl: 'products.component.html'
})
export class ProductsComponent implements AfterViewInit{

  constructor(private spinner: NgxSpinnerService) { }

  ngAfterViewInit(): void {
    this.spinner.hide();
  }
}
