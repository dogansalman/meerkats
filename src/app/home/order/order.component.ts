import {Component, ViewEncapsulation} from '@angular/core';

export interface PeriodicElement {
  unit:number,
  name: string;
  price: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {unit: 1,name: 'Sıcak Çikolata', price: 15.00},
  {unit: 1,name: 'Çay', price: 20.00,},
  {unit: 1,name: 'Cheesecake', price: 22.00},
  {unit: 1,name: 'Tiremisu', price: 18.00},
  {unit: 1,name: 'Türk Kahvesi', price: 19.00},
  {unit: 1,name: 'Neskafe', price: 12.80},
  {unit: 1,name: 'Elmalı Turta', price: 14.65},
  {unit: 1,name: 'Büyük Çay', price: 15.50},
  {unit: 1,name: 'Kuşburnu', price: 18.50},
  {unit: 1,name: 'Limonata', price: 20.50},
];


@Component({
  templateUrl:'order.component.html',
  styleUrls: ['order.component.scss'],
  encapsulation: ViewEncapsulation.None
})


export class OrderComponent{

  public showPriceDown = false;

  displayedColumns: string[] = ['unit','name', 'price','process' ];
  dataSource = ELEMENT_DATA;

  constructor(){}

  onChangePriceDown(): void {
    console.log('tested');
    this.showPriceDown = this.showPriceDown ? false : true;
  }
  onUpdatePaymentItem(params: number, index: number): void {
    var unit = this.dataSource[index].unit + params;
    if(unit < 0) return;
    this.dataSource[index].unit = unit;
  }
}
