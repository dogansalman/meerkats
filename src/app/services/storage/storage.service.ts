import {Injectable} from '@angular/core';
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from '@angular/fire/storage';
import {AngularFireDatabase} from '@angular/fire/database';

@Injectable()
export class StorageService {

  public ref: AngularFireStorageReference;
  public path: string;

  constructor(private storage: AngularFireStorage, private afd: AngularFireDatabase) { }


  pushUpload(file: File, path: string): AngularFireUploadTask {

    //TODO path düzenlenecek.

    // set file path
    this.path = path + `/${this.afd.createPushId()}_${file.name}`;
    // Reference to storage bucket
    this.ref = this.storage.ref(path);

    // The main task
    return this.storage.upload(path, file);

  }

}
