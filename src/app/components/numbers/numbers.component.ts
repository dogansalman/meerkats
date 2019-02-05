import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-numbers-com',
  templateUrl: 'numbers.component.html',
  styleUrls: ['numbers.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class NumbersComponent {

  public quantity: number = 1;
  public numbs: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];


  constructor() { }

  onClickNumb(numb: number): void {
    const changedNumb = Number(this.quantity.toString() + numb);
    if (changedNumb > 999 ) { return; }
    if (changedNumb <= 0) { this.quantity = 1;  return; }
    this.quantity = changedNumb;
  }
  onDeleteNumb(): void {
    const changedNumb =  Number(this.quantity.toString().substr(0, this.quantity.toString().length -1));
    this.quantity = changedNumb <= 0 ? 0 : changedNumb;
  }
}
