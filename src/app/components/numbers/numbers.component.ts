import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-numbers-com',
  templateUrl: 'numbers.component.html',
  styleUrls: ['numbers.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class NumbersComponent{

  public quantity: number = 1;
  public numbs: Array<number> = [1,2,3,4,5,6,7,8,9,0];


  constructor(){}

  onClickNumb(numb: number): void {
    let changedNumb = Number(this.quantity.toString() + numb);
    if(changedNumb > 999 || changedNumb <= 0) return;
    this.quantity = changedNumb;
  }
  onDeleteNumb(): void {
    
  }
}
