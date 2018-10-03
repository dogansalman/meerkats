import {AfterContentInit, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  encapsulation: ViewEncapsulation.None
})

export class PersonComponent implements OnInit, AfterContentInit{

  constructor(private spinner: NgxSpinnerService) {}

  ngOnInit(): void { }
  ngAfterContentInit(): void {
    this.spinner.hide();
  }
}
