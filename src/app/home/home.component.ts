import {AfterContentInit, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {SnackbarService} from '../services/snackbar/snackbar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit, AfterContentInit {

  constructor(private spinner: NgxSpinnerService, private snackbarService: SnackbarService) { }

  ngOnInit() {
    this.snackbarService.show('Henüz masa oluşturmadınız.','Ekle','success').afterDismissed().subscribe(() => {
      console.log('data');
    });
  }

  ngAfterContentInit() { this.spinner.hide(); }

}
