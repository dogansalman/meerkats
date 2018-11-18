import {AfterContentInit, Component, OnInit, ViewEncapsulation, OnDestroy} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {ForgotComponent} from './forgot/forgot.component';
import {MatDialog} from '@angular/material';
import {Renderer2} from '@angular/core';

@Component({
  selector: 'app-login',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterContentInit, OnDestroy {

  constructor(private spinner : NgxSpinnerService, public dialog: MatDialog, private renderer: Renderer2) {}

  forgotModal(): void {
    const dialogRef = this.dialog.open(ForgotComponent, {
      width: '450px',
      data: {name: 'name', animal: 'animal'}
    });

    dialogRef.afterClosed().subscribe(result => { });
  }

  ngOnInit() {
    this.renderer.addClass(document.body,'app-login');
    this.spinner.show();
  }
  ngOnDestroy(){
    this.renderer.removeClass(document.body,'app-login');
  }
  ngAfterContentInit() {this.spinner.hide();}
}
