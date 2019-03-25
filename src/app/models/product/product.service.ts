import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {Product} from './product';
import {AuthService} from '../../services/auth/auth.service';

@Injectable()
export class ProductService {

  constructor(private db: AngularFireDatabase, private auth: AuthService) {}

  getCategories(data: any[]): any {
    return data.map(item => item.category).filter((value, index, self) => self.indexOf(value) === index);
  }

  get(): AngularFireList<Product> {
    return this.db.list('/product/' +  this.auth.user.uid);
  }

  update(data: Product): any {
    const key = data.$key;
    delete data.$key;
    return  this.db.object('/product/' + this.auth.user.uid + '/' + key).update(data);
  }

  create(data: Product): any {
    delete data.$key;
    return this.db.list('product/' + this.auth.user.uid).push(data);
  }

  delete(data: Product): any {
    return this.db.object('/product/' + this.auth.user.uid + '/' + data.$key).remove();
  }
}
