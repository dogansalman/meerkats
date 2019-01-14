import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database-deprecated';
import {FirebaseListObservable} from '@angular/fire/database-deprecated';


@Injectable({
  providedIn: 'root'
})
export class BussinessTypeServices {

  public bussinesTypes: FirebaseListObservable<any>;

  constructor(private db: AngularFireDatabase) { console.log('services init'); }

  get() {
    this.bussinesTypes = this.db.list('/business_type');
    // 1return this.bussinesTypes;
  }

}
