import {Component, ViewEncapsulation} from '@angular/core';

export interface PeriodicElement {
  unit:number,
  name: string;
  price: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {unit: 1,name: 'Sıcak Çikolata', price: 1.0079},
  {unit: 1,name: 'Çay', price: 4.0026,},
  {unit: 1,name: 'Cheesecake', price: 6.941},
  {unit: 1,name: 'Tiremisu', price: 9.0122},
  {unit: 1,name: 'Türk Kahvesi', price: 10.811},
  {unit: 1,name: 'Neskafe', price: 12.0107},
  {unit: 1,name: 'Elmalı Turta', price: 14.0067},
  {unit: 1,name: 'Büyük Çay', price: 15.9994},
  {unit: 1,name: 'Kuşburnu', price: 18.9984},
  {unit: 1,name: 'Limonata', price: 20.1797},
];


@Component({
  templateUrl:'order.component.html',
  styleUrls: ['order.component.scss'],
  encapsulation: ViewEncapsulation.None
})


export class OrderComponent{

  displayedColumns: string[] = ['unit','name', 'price','process' ];
  dataSource = ELEMENT_DATA;

  constructor(){}

}
