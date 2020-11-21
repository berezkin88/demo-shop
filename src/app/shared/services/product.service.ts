import { Product } from 'shared/models/product';
import { Observable } from 'rxjs';
import { AngularFireDatabase, SnapshotAction } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product): any {
    return this.db.list('/products').push(product);
  }

  getAll(): Observable<SnapshotAction<Product>[]> {
    return this.db.list<Product>('/products').snapshotChanges();
  }

  get(productId): Observable<any> {
    return this.db.object(`/products/${productId}`).valueChanges();
  }

  update(productId, product): Promise<void> {
    return this.db.object(`/products/${productId}`).update(product);
  }

  delete(productId): Promise<void> {
    return this.db.object(`/products/${productId}`).remove();
  }
}
