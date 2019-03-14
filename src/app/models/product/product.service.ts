import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Product} from './product';


@Injectable()
export class ProductService {
  products: Product[];

  constructor(private db: AngularFireDatabase) {}

  getCategories(data: any[]): any {
    return data.map(item => item.category).filter((value, index, self) => self.indexOf(value) === index);
  }

  get() {
    return new Promise((resolve, reject) => {
      this.products = [];
      this.db.list('/product', ref => ref.orderByChild('business_id').equalTo('dummy')).snapshotChanges().subscribe(res => {
        res.forEach(element => {
          const item = element.payload.toJSON();
          item['$key'] = element.key;
          this.products.push(item as Product);
        });
        return resolve(this.products);
      });
    });
  }

  update(data: Product) {
    return new Promise((resolve, reject) => {
      const key = data.$key;
      delete data.$key;
      this.db.object('/product/' + key).update(data)
        .then(() => resolve(Object.assign(data, {'$key': key})))
        .catch(() => reject(null));
    });
  }

  create(data: Product) {
    return new Promise((resolve, reject) => {
      this.db.list('/product').push(data).then(() => resolve(data));
    });
  }

  delete(data: Product) {
    // TODO add queryFn before deleting item on firebase
    return new Promise((resolve, reject) => {
      this.db.object('/product/' + data.$key).remove().then(() => resolve(true))
        .catch(err => reject(err));
    });
  }
}
