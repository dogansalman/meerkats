import {Injectable} from '@angular/core';
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from '@angular/fire/storage';
import {AngularFireDatabase} from '@angular/fire/database';

@Injectable()
export class StorageService {

  public ref: AngularFireStorageReference;
  public path: string;

  constructor(private storage: AngularFireStorage, public afd: AngularFireDatabase) { }


  pushUpload(file: any, path: string): AngularFireUploadTask {

    // set file path
    this.path = path + `/${this.afd.createPushId()}_${file.name}`;

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
