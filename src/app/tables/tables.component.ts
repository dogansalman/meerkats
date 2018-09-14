import {Component, OnInit, AfterContentInit,  ViewEncapsulation} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TablesComponent implements OnInit, AfterContentInit {

  constructor(private spinner: NgxSpinnerService) { }

  ngOnInit() { this.spinner.show(); }
  ngAfterContentInit(){ this.spinner.hide() }

}
