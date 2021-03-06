import {Component, OnInit} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {AuthService} from './services/auth/auth.service';
import {MatSnackBar} from '@angular/material';
import {TranslatePipe} from './services/translate/translate.pipe';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthService, TranslatePipe]
})
export class AppComponent implements OnInit  {

  constructor(private spinner: NgxSpinnerService,
              private matIconRegistry: MatIconRegistry,
              private snackbar: MatSnackBar,
              private translater: TranslatePipe,
              private domSanitizer: DomSanitizer, private auth: AuthService) {

    /* Set Custom Icons */
    this.matIconRegistry.addSvgIcon('table-svg', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icon/table.svg'));
    this.matIconRegistry.addSvgIcon('employee-svg', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icon/employee.svg'));
    this.matIconRegistry.addSvgIcon('cutlery-svg', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icon/cutlery.svg'));
    this.matIconRegistry.addSvgIcon('growth-svg', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icon/growth.svg'));
    this.matIconRegistry.addSvgIcon('chef-svg', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icon/chef.svg'));
    this.matIconRegistry.addSvgIcon('pos-svg', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icon/pos.svg'));
    this.matIconRegistry.addSvgIcon('add-svg', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icon/add.svg'));
    this.matIconRegistry.addSvgIcon('qr-code-svg', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icon/qr-code.svg'));

  }

  ngOnInit() {
    this.spinner.show();
    /* User logged */
    this.auth.afAuth.auth.onAuthStateChanged((user) => {
      if (user && !user.emailVerified) {
        this.snackbar.open(this.translater.transform('verify_email_message'), null, {duration: 5000, panelClass: 'snack_warning'});
      }
    });

  }

}
