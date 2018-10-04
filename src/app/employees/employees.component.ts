import {AfterContentInit, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {personInterface} from '../interfaces/person';

const ELEMENT_DATA: personInterface[] = [
  {id: 1,name: 'doğan', lastname: 'salman', password: '12312',place_id: 1, username: 'dogan'},
  {id: 1,name: 'doğan', lastname: 'salman', password: '12312',place_id: 1, username: 'dogan'},
  {id: 1,name: 'doğan', lastname: 'salman', password: '12312',place_id: 1, username: 'dogan'},
  {id: 1,name: 'doğan', lastname: 'salman', password: '12312',place_id: 1, username: 'dogan'},
  {id: 1,name: 'doğan', lastname: 'salman', password: '12312',place_id: 1, username: 'dogan'},
  {id: 1,name: 'doğan', lastname: 'salman', password: '12312',place_id: 1, username: 'dogan'},
  {id: 1,name: 'doğan', lastname: 'salman', password: '12312',place_id: 1, username: 'dogan'},
  {id: 1,name: 'doğan', lastname: 'salman', password: '12312',place_id: 1, username: 'dogan'},
  {id: 1,name: 'doğan', lastname: 'salman', password: '12312',place_id: 1, username: 'dogan'},
  {id: 1,name: 'doğan', lastname: 'salman', password: '12312',place_id: 1, username: 'dogan'}
];

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  encapsulation: ViewEncapsulation.None
})


export class EmployeesComponent implements OnInit, AfterContentInit{

  displayedColumns: string[] = ['name', 'lastname', 'username'];
  dataSource = ELEMENT_DATA;

  constructor(private spinner: NgxSpinnerService) {}


  ngOnInit(): void { }
  ngAfterContentInit(): void {
    this.spinner.hide();
  }

  onPersonModal(): void {
    alert('alerts');
  }
}
