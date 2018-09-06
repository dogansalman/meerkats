import {AfterContentInit, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';


@Component({
  selector: 'app-login',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterContentInit {


  constructor(private spinner : NgxSpinnerService) {
    console.log('loaded login com')
  }

  ngOnInit() {
    //this.spinner.show();

  }

  ngAfterContentInit() {
    // contentChild is set after the content has been initialized
    console.log('AfterContentInit');
    this.spinner.hide();
  }
}
