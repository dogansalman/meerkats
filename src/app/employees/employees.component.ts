import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {MatDialog} from '@angular/material';
import {EmployeeComponent} from './employee/employee.component';
import {EmployeeService} from '../models/employee/employee.service';
import {Employee} from '../models/employee/employee';
import {TranslatePipe} from '../services/translate/translate.pipe';
import {MatSnackBar} from '@angular/material';
import {AngularFireDatabase} from '@angular/fire/database';
import {ConfirmComponent} from '../components/confirm/confirm.component';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  encapsulation: ViewEncapsulation.None,
  providers: [EmployeeService, TranslatePipe]
})


export class EmployeesComponent implements OnInit {
  /* Properties  */
  public employees: Employee[];
  private _DbRef;
  public displayedColumns: string[] = ['name', 'lastname', 'username', 'permissions', 'actionsColumn'];
  private newItemAdded = false;
  public openedTableDetail = false;

  /* Consturctor set DbRef */
  constructor(private spinner: NgxSpinnerService,
              private dialog: MatDialog,
              private db: AngularFireDatabase,
              private employeeService: EmployeeService, private snack: MatSnackBar, private translater: TranslatePipe) {

    /* Set database ref */
    this._DbRef = this.db.database.ref('/employee');
  }

  ngOnInit(): void {
    /* Get & Set Employees  */
    this.employeeService.get().then(data =>  this.employees = data as Employee[]).then(() => this.spinner.hide());

    /* On updated data */
    this._DbRef.on('child_changed', (child) => {
      /* Get index changed table */
      const selectedIndex = this.employees.findIndex(a => a.$key === child.key);
      /* Fixes for dom updating */
      this.employees.splice(selectedIndex, 1, Object.assign(child.val() as Employee, {$key: child.key}));
      this.employees = [...this.employees];
    });

    /* On added data */
    this._DbRef.on('child_added', (child) => {
      if (!this.newItemAdded) { return; }
      this.employees = [...this.employees, Object.assign(child.val() as Employee, {$key: child.key})];
    });

    /* On removed data */
    this._DbRef.on('child_removed', (child) => {
      const removedIndex = this.employees.findIndex(a => a.$key === child.key);
      this.employees.splice(removedIndex , 1);
      // for dom updating on delete table
      this.employees = this.employees.filter((e, i) => removedIndex !== i);
    });

    this._DbRef.once('value', () => this.newItemAdded = true);

  }

  /* Open person modal */
  onPersonModal(employee: Employee): void {
    if (this.openedTableDetail) { return; }
    this.openedTableDetail = true;
    const dialogRef =  this.dialog.open(EmployeeComponent, {width: '600px', height: '450px', data: employee});

    dialogRef.afterClosed().subscribe((result) => {
      this.openedTableDetail = false;
      if (!result || result === 'undefined' || result == null) { return; }
      if (result === true) {
        this.snack.open(this.translater.transform('successful'), this.translater.transform('ok_button'), {duration: 3000, panelClass: 'snack_success'});
        return;
      }
      this.snack.open(this.translater.transform('unsuccessful'), this.translater.transform('ok_button'), {duration: 3000, panelClass: 'snack_error'});
    });
  }

  /* Delete person */
  onDelete(employee: Employee): void {
    this.openedTableDetail = true;
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '450px',
      data: {message: this.translater.transform('sure_message'), title: this.translater.transform('sure_message_title')}
    });

    dialogRef.componentInstance.onSelect.subscribe(result => {
      if (!result) { return; }
      this.employeeService.delete(employee).then(() => {
        this.snack.open(this.translater.transform('successful'), this.translater.transform('ok_button'), {duration: 3000, panelClass: 'snack_success'});
      }).catch(err => {
        this.snack.open(this.translater.transform('unsuccessful'), this.translater.transform('ok_button'), {duration: 3000, panelClass: 'snack_error'});
        console.log('Debug:' + err);
      });
    });

    dialogRef.afterClosed().subscribe(() => { dialogRef.componentInstance.onSelect.unsubscribe();  this.openedTableDetail = false; });
  }
}
