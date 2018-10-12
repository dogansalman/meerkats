import {AfterContentInit, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {personInterface} from '../interfaces/person';
import {MatDialog} from '@angular/material';
import {EmployeeComponent} from './employee/employee.component';

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

  constructor(private spinner: NgxSpinnerService, private dialog: MatDialog) {}


  ngOnInit(): void { }
  ngAfterContentInit(): void {
    this.spinner.hide();
  }

  onPersonModal(): void {
    this.dialog.open(EmployeeComponent, {width:'450px', height: '600px'});
  }
}
