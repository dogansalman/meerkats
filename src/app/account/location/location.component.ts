import {Component, Inject} from '@angular/core';
import {Coords} from '../../interfaces/coords';
import {Marker} from '../../interfaces/marker';
import {AuthService} from '../../services/auth/auth.service';
import {MatSnackBar} from '@angular/material';
import {TranslatePipe} from '../../services/translate/translate.pipe';
import {ConfirmComponent} from '../../components/confirm/confirm.component';
import {AccountService} from '../../models/account/account.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material';

@Component({
    selector: 'account-location',
    templateUrl: 'location.component.html',
    providers: [AuthService, TranslatePipe, AccountService]
})

export class LocationComponent{
    cordi: Coords = {  latitude: 0, longitude: 0 };
    markers: Marker[];
    zoom: Number = 8;
    User: any;

    constructor(public auth: AuthService,
                private snack: MatSnackBar,
                private accService: AccountService,
                private translater: TranslatePipe,
                private spinner: NgxSpinnerService,
                private dialog: MatDialog,
                @Inject(MAT_DIALOG_DATA) public data: any,
        ) { 

            /**
                 this.http.get('https://maps.google.com/maps/api/geocode/json?address=' + this.frmGroup.value.location.province.name + ' ' + this.frmGroup.value.location.district.name + '&key=' + environment.mapKey, {}).subscribe((data => {
                this.cordi.latitude = data.results[0].geometry.location.lat;
                this.cordi.longitude = data.results[0].geometry.location.lng;
                this.zoom = 14;
              }));
             * 
            */
  

            this.auth.getProfileDetail.subscribe(u => {
                this.User = u;
                console.log(this.User);
                this.markers = [];
                this.markers.push({lat: this.User.location.coords.latitude, lng: this.User.location.coords.longitude, draggable: true});
              });

        }

    onUpdateLocation(): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
        width: '450px',
        data: {message: this.translater.transform('account_approve_message'), title: this.translater.transform('sure_message_title') }
    });
    dialogRef.componentInstance.onSelect.subscribe(result => {
        if (!result) { return; }
        this.spinner.show();
        /*
        this.accService.setLocation(this.frmGroup.value.location, this.auth.afAuth.auth.currentUser.uid).then(() => {
        this.spinner.hide();
        this.snack.open(this.translater.transform('successful'), this.translater.transform('ok_button'), {duration: 3000, panelClass: 'snack_success'});
        }).catch(err => {
        this.spinner.hide();
        this.snack.open(err.message || this.translater.transform('successful'), this.translater.transform('ok_button'), {duration: 3000, panelClass: 'snack_success'});
        });
        */
    
    });
    dialogRef.afterClosed().subscribe(() => dialogRef.componentInstance.onSelect.unsubscribe());
    }
    addMarker($event: any) {
    this.markers = [];
    this.markers.push({lat: $event.coords.lat, lng: $event.coords.lng, draggable: true});
    }
    

}