import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {MatDialog} from '@angular/material';
import {EmployeeComponent} from './employee/employee.component';
import {EmployeeService} from '../models/employee/employee.service';
import {Employee} from '../models/employee/employee';


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  encapsulation: ViewEncapsulation.None,
  providers: [EmployeeService]
})


export class EmployeesComponent implements OnInit {
  public dataSource: Employee[];
  public displayedColumns: string[] = ['name', 'lastname', 'username', 'permissions'];

  constructor(private spinner: NgxSpinnerService, private dialog: MatDialog, private employeeService: EmployeeService) { }


  ngOnInit(): void {
    /* Get Employee */
    this.employeeService.get().then(data =>  this.dataSource = data as Employee[]).then(() => this.spinner.hide());
  }


  onPersonModal(): void {
    this.dialog.open(EmployeeComponent, {width: '600px', height: '450px'});
  }
}
