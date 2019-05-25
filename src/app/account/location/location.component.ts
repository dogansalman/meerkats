import {Component, Inject} from '@angular/core';
import {Coords} from '../../interfaces/coords';
import {Marker} from '../../interfaces/marker';
import {AuthService} from '../../services/auth/auth.service';
import {MatSnackBar, MatDialogRef} from '@angular/material';
import {TranslatePipe} from '../../services/translate/translate.pipe';
import {ConfirmComponent} from '../../components/confirm/confirm.component';
import {AccountService} from '../../models/account/account.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {HttpClient} from '@angular/common/http';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material';
import {environment} from '../../../environments/environment'

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
                private http: HttpClient,
                private dialogRef: MatDialogRef<LocationComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
        ) { 
          this.setCoordinates();
        }

    onUpdateLocation(): void {
    const confirmDialogRef = this.dialog.open(ConfirmComponent, {
        width: '450px',
        data: {message: this.translater.transform('account_approve_message'), title: this.translater.transform('sure_message_title') }
    });
    confirmDialogRef.componentInstance.onSelect.subscribe(result => {
        if (!result) { return; }
        this.spinner.show();
        this.accService.setLocation(Object.assign(this.data, {coords: this.cordi}), this.auth.afAuth.auth.currentUser.uid).then(() => {
        this.spinner.hide();
        this.dialogRef.close();
        this.snack.open(this.translater.transform('successful'), this.translater.transform('ok_button'), {duration: 3000, panelClass: 'snack_success'});
        }).catch(err => {
        this.spinner.hide();
        this.snack.open(err.message || this.translater.transform('successful'), this.translater.transform('ok_button'), {duration: 3000, panelClass: 'snack_success'});
        });
    });
    confirmDialogRef.afterClosed().subscribe(() => confirmDialogRef.componentInstance.onSelect.unsubscribe());
    }
    addMarker($event: any, lat: number = null, lng: number = null) {
    this.markers = [];
    lat && lng ? this.markers.push({lat: lat, lng: lng, draggable: true}) :  this.markers.push({lat: $event.coords.lat, lng: $event.coords.lng, draggable: true});
    }
    setCoordinates(): void {
        /* Has the locations*/
        if(this.data.coords) {
            Object.assign(this.cordi, this.data.coords);
            this.addMarker(null, this.cordi.latitude, this.cordi.longitude);
            this.zoom = 16;
            return;
        }
        this.http.get('https://maps.google.com/maps/api/geocode/json?address=' + this.data.province.name + ' ' + this.data.district.name + '&key=' + environment.mapKey, {}).subscribe(( (geoResult : any) => {
            this.cordi.latitude = geoResult.results[0].geometry.location.lat;
            this.cordi.longitude = geoResult.results[0].geometry.location.lng;
            this.zoom = 14;
          }));
    }
}