import {Injectable} from '@angular/core';
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from '@angular/fire/storage';
import {AngularFireDatabase} from '@angular/fire/database';
import {pipe} from 'rxjs/internal-compatibility';
import {finalize, switchMap, tap} from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';

@Injectable()
export class StorageService {

  public ref: AngularFireStorageReference;
  public path: string;

  constructor(private storage: AngularFireStorage, private afd: AngularFireDatabase) { }


  pushUpload(file: any, path: string): AngularFireUploadTask {

    // TODO devam edecek.
    // set file path
    // this.path = path + `/${this.afd.createPushId()}_${file.name}`;
    this.path = `test/${Date.now()}_${file.name}`;
    // Reference to storage bucket
    this.ref = this.storage.ref(this.path);

    // The main task
    return this.storage.upload(this.path, file);

  }

  readImageFromFile(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
      const r = new FileReader();
      r.readAsDataURL(file);
      r.onloadend = () => {
        resolve(r.result);
      };
    });
  }
}
