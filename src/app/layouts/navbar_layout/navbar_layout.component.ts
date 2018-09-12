import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar-layout',
  templateUrl: 'navbar_layout.component.html',
  styleUrls: ['navbar_layout.component.css'],
  encapsulation: ViewEncapsulation.None,


})

export class Navbar_layoutComponent implements OnInit{

  public currentRoute = null;
  constructor(private router: Router){}

  ngOnInit() {
    this.currentRoute =  this.router.url.substr(1, this.router.url.length -1);
  }

}
