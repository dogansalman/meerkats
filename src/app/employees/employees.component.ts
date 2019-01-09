import {AfterContentInit, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {EmployeeInterface} from '../interfaces/employee';
import {MatDialog} from '@angular/material';
import {EmployeeComponent} from './employee/employee.component';

const ELEMENT_DATA: EmployeeInterface[] = [
  {name: 'doğan', lastname: 'salman', password: '12312', business_id: '1', username: 'dogan', permissions: 'Sipariş Yönetimi, Ürün Yönetimi, Masa Yönetimi',},
  {name: 'doğan', lastname: 'salman', password: '12312', business_id: '1', username: 'dogan', permissions: 'Sipariş Yönetimi, Ürün Yönetimi, Masa Yönetimi'},
  {name: 'doğan', lastname: 'salman', password: '12312', business_id: '1', username: 'dogan', permissions: 'Sipariş Yönetimi, Ürün Yönetimi'},
  {name: 'doğan', lastname: 'salman', password: '12312', business_id: '1', username: 'dogan', permissions: 'Sipariş Yönetimi, Ürün Yönetimi, Masa Yönetimi'},
  {name: 'doğan', lastname: 'salman', password: '12312', business_id: '1', username: 'dogan', permissions: 'Sipariş Yönetimi, Ürün Yönetimi, Masa Yönetimi'},
  {name: 'doğan', lastname: 'salman', password: '12312', business_id: '1', username: 'dogan', permissions: 'Sipariş Yönetimi, Ürün Yönetimi, Masa Yönetimi'},
  {name: 'doğan', lastname: 'salman', password: '12312', business_id: '1', username: 'dogan', permissions: 'Sipariş Yönetimi, Ürün Yönetimi, Masa Yönetimi'},
  {name: 'doğan', lastname: 'salman', password: '12312', business_id: '1', username: 'dogan', permissions: 'Sipariş Yönetimi, Ürün Yönetimi, Masa Yönetimi'},
  {name: 'doğan', lastname: 'salman', password: '12312', business_id: '1', username: 'dogan', permissions: 'Tam Yetkili(Yönetici)'},
  {name: 'doğan', lastname: 'salman', password: '12312', business_id: '1', username: 'dogan', permissions: 'Sipariş Yönetimi, Ürün Yönetimi, Masa Yönetimi'},
  {name: 'doğan', lastname: 'salman', password: '12312', business_id: '1', username: 'dogan', permissions: 'Sipariş Yönetimi, Ürün Yönetimi, Masa Yönetimi'},
  {name: 'doğan', lastname: 'salman', password: '12312', business_id: '1', username: 'dogan', permissions: 'Sipariş Yönetimi, Ürün Yönetimi, Masa Yönetimi'},
  {name: 'doğan', lastname: 'salman', password: '12312', business_id: '1', username: 'dogan', permissions: 'Sipariş Yönetimi, Ürün Yönetimi, Masa Yönetimi'},

];

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  encapsulation: ViewEncapsulation.None
})


export class EmployeesComponent implements OnInit, AfterContentInit{

  displayedColumns: string[] = ['name', 'lastname', 'username', 'permissions'];
  dataSource = ELEMENT_DATA;

  constructor(private spinner: NgxSpinnerService, private dialog: MatDialog) {}


  ngOnInit(): void { }
  ngAfterContentInit(): void {
    this.spinner.hide();
  }

  onPersonModal(): void {
    this.dialog.open(EmployeeComponent, {width: '600px', height: '450px'});
  }
}
