import {AfterViewInit, Component} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';

@Component(
  {
    selector: 'app-business',
    templateUrl: 'business.component.html'
  }
)

export class BusinessComponent implements AfterViewInit {

  constructor(private spinner: NgxSpinnerService) { }

  ngAfterViewInit(): void { this.spinner.hide(); }
}
