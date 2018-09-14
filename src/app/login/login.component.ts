import {AfterContentInit, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {ForgotComponent} from './forgot/forgot.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-login',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterContentInit {

  constructor(private spinner : NgxSpinnerService, public dialog: MatDialog) {
    console.log('loaded login com')
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ForgotComponent, {
      width: '450px',
      data: {name: 'name', animal: 'animal'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }


  ngOnInit() {this.spinner.show();}
  ngAfterContentInit() {this.spinner.hide();}
}
