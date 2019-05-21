import {Component, ViewEncapsulation, Output, EventEmitter} from '@angular/core';
import {MatDialog} from '@angular/material';
import {QuantityComponent} from '../../components/quantity/quantity.component';
import {ConfirmComponent} from '../../components/confirm/confirm.component';
import {TranslatePipe} from '../../services/translate/translate.pipe';

export interface PeriodicElement {
  unit: number;
  name: string;
  price: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {unit: 1, name: 'Sıcak Çikolata', price: 15.00},
  {unit: 1, name: 'Çay', price: 20.00},
  {unit: 1, name: 'Cheesecake', price: 22.00},
  {unit: 1, name: 'Tiremisu', price: 18.00},
  {unit: 1, name: 'Türk Kahvesi', price: 19.00},
  {unit: 1, name: 'Neskafe', price: 12.80},
  {unit: 1, name: 'Elmalı Turta', price: 14.65},
  {unit: 1, name: 'Büyük Çay', price: 15.50},
  {unit: 1, name: 'Kuşburnu', price: 18.50},
  {unit: 1, name: 'Limonata', price: 20.50},
];


@Component({
  templateUrl: 'order.component.html',
  styleUrls: ['order.component.scss'],
  selector: 'home-order',
  encapsulation: ViewEncapsulation.None,
  providers: [TranslatePipe],
})


export class OrderComponent {

  @Output() onSelect = new EventEmitter();

  public showPriceDown = false;

  displayedColumns: string[] = ['name', 'unit', 'price', 'process' ];
  dataSource = ELEMENT_DATA;

  constructor(private dialog: MatDialog, private translater: TranslatePipe) { }

  onQuantityModal(): void {
    this.dialog.open(QuantityComponent, {width: '300px', height: '300px'});
  }
  onChangePriceDown(): void {
    this.showPriceDown = this.showPriceDown ? false : true;
  }
  onUpdatePaymentItem(params: number, index: number): void {
    const unit = this.dataSource[index].unit + params;
    if (unit < 0) { return; }
    this.dataSource[index].unit = unit;
  }
  removeItem(item): void {
    this.dataSource.find(itm => itm === item).unit = 0;
  }
  onConfirm(data): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '450px',
      data: {message: this.translater.transform('sure_message'), title: this.translater.transform('sure_message_title') }
    });
    dialogRef.componentInstance.onSelect.subscribe(result => {
      if (result) { this.removeItem(data); }
    });
    dialogRef.afterClosed().subscribe(() => dialogRef.componentInstance.onSelect.unsubscribe());

  }



}
