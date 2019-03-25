import {Component, OnInit, ViewEncapsulation, AfterViewInit} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {MatDialog} from '@angular/material';
import {EmployeeComponent} from './employee/employee.component';
import {EmployeeService} from '../models/employee/employee.service';
import {Employee} from '../models/employee/employee';
import {TranslatePipe} from '../services/translate/translate.pipe';
import {MatSnackBar} from '@angular/material';
import {AngularFireDatabase} from '@angular/fire/database';
import {ConfirmComponent} from '../components/confirm/confirm.component';
import {Observable} from 'rxjs/internal/Observable';
import {tap} from 'rxjs/operators';
import {keyVal} from '../operators/keyVal/keyVal';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  encapsulation: ViewEncapsulation.None,
  providers: [EmployeeService, TranslatePipe]
})


export class EmployeesComponent implements OnInit, AfterViewInit {
  /* Properties  */
  public employees: Observable<Employee[]>;

  public displayedColumns: string[] = ['name', 'lastname', 'username', 'permissions', 'actionsColumn'];
  public openedTableDetail = false;

  constructor(private spinner: NgxSpinnerService,
              private dialog: MatDialog,
              private db: AngularFireDatabase,
              private employeeService: EmployeeService, private snack: MatSnackBar, private translater: TranslatePipe) {
  }

  ngOnInit(): void {
    this.employees  = this.employeeService.get().snapshotChanges()
      .pipe(
       keyVal(),
       tap(() => this.spinner.hide())
      );
  }
  ngAfterViewInit(): void {
    /* Hide spinner when empty data */
    this.employees.subscribe(d =>  d.length === 0 ? this.spinner.hide() : null);
  }
  /* Open person modal */
  onPersonModal(employee: Employee): void {
    if (this.openedTableDetail) { return; }
    this.openedTableDetail = true;
    const dialogRef =  this.dialog.open(EmployeeComponent, {width: '600px', height: '500px', data: employee});

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

