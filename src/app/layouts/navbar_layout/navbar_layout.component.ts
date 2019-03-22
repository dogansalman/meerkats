import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {NavigationStart, Router} from '@angular/router';
import {MatSidenav} from '@angular/material';
import {NgxSpinnerService} from 'ngx-spinner';
import {TranslateService} from '../../services/translate/translate.service';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-navbar-layout',
  templateUrl: 'navbar_layout.component.html',
  styleUrls: ['navbar_layout.component.css'],
  encapsulation: ViewEncapsulation.None,


})

export class Navbar_layoutComponent implements OnInit {

  @ViewChild('sidenav') public sideNav: MatSidenav;
  public currentRoute = null;
  constructor(private router: Router, private spinner: NgxSpinnerService, private translateService: TranslateService, private auth: AuthService) {
    /* While changing route show to the spinner */
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationStart) { this.spinner.show(); }
      if (this.sideNav.opened) { this.sideNav.close(); }
    });
  }

  onChangeLang(lang: string): void {
    this.translateService.use(lang);
  }
  ngOnInit() {
    this.currentRoute =  this.router.url.substr(1, this.router.url.length - 1);
  }
  logOut(): void {
    this.auth.logout();
  }

}
