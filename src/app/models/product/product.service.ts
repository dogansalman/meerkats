import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {Product} from './product';
import {AuthService} from '../../services/auth/auth.service';
import {finalize} from 'rxjs/operators';
import {StorageService} from '../../services/storage/storage.service';

@Injectable()
export class ProductService {

  constructor(private db: AngularFireDatabase, private auth: AuthService, private storage: StorageService) {}

  getCategories(data: any[]): any {
    return data.map(item => item.category).filter((value, index, self) => self.indexOf(value) === index);
  }

  get(): AngularFireList<Product> {
    return this.db.list('/product/' +  this.auth.user.uid);
  }

  update(data: Product, photoFile: File = null): any {
    const key = data.$key;
    delete data.$key;
    // TODO bu karmaşadan daha sonra kurtulmalıyız.
    if (photoFile) {
      return new Promise((resolve, reject) => {
        this.storage.pushUpload(photoFile, this.auth.user.uid + '/products/' + key + '/').snapshotChanges().pipe(
          finalize( async() => {
            data.image =  await this.storage.ref.getDownloadURL().toPromise();
            resolve(this.db.object('/product/' + this.auth.user.uid + '/' + key).update(data));
          })
        ).subscribe();
      });
    }

    return  this.db.object('/product/' + this.auth.user.uid + '/' + key).update(data);
  }

  create(data: Product, photoFile: File = null): any {
    // TODO bu karmaşadan daha sonra kurtulmalıyız.
    delete data.$key;
    if (photoFile) { delete data.image; }

    return new Promise((resolve, reject) => {
      const p = this.db.list('product/' + this.auth.user.uid).push(data);
      if (p.key == null) { reject(); }

      if (p.key && photoFile) {
        this.storage.pushUpload(photoFile, this.auth.user.uid + '/products/' + p.key + '/').snapshotChanges().pipe(
          finalize( async() => {
            data.image =  await this.storage.ref.getDownloadURL().toPromise();
            resolve(this.db.object('/product/' + this.auth.user.uid + '/' + p.key).update(data));
          })
        ).subscribe();
      }
      resolve(p);
    });


  }

  delete(data: Product): any {
    return this.db.object('/product/' + this.auth.user.uid + '/' + data.$key).remove();
  }
}
