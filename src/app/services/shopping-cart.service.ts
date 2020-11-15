import { Product } from './../models/product';
import { Item } from './../models/item';
import { Cart } from './../models/cart';
import { take, map } from 'rxjs/operators';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { database } from 'firebase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private create(): database.ThenableReference {
    return this.db.list<Cart>('/shopping-carts').push({
      dateCreated: new Date().getTime(),
      itemsMap: null,
      items: null,
      totalPrice: null,
      totalItemsCount: null,
      getQuantity: null
    });
  }

  async getCart(): Promise<Observable<Cart>> {
    const cartId = await this.getOrCreateCartId();
    return this.db.object<{ dateCreated: number, items: {} }>(`/shopping-carts/${cartId}`)
      .valueChanges()
      .pipe(
        map(x => new Cart(x.items))
      );
  }

  private async getOrCreateCartId(): Promise<string> {
    const cartId = localStorage.getItem('cartId');
    if (!cartId) {
      const result = await this.create();
      localStorage.setItem('cartId', result.key);
      return result.key;
    }
    return cartId;
  }

  private getItem(cartId: string, productKey: string): AngularFireObject<Item> {
    return this.db.object<Item>(`/shopping-carts/${cartId}/items/${productKey}`);
  }

  async addToCart(product: Product): Promise<void> {
    this.updateItemQuantity(product, 1);
  }

  async removeFromCart(product: Product): Promise<void>  {
    this.updateItemQuantity(product, -1);
  }

  private async updateItemQuantity(product: Product, change: number): Promise<void> {
    const cartId = await this.getOrCreateCartId();
    const item$ = this.getItem(cartId, product.key);
    item$.valueChanges().pipe(take(1)).subscribe(item => {
      item$.update({ product, quantity: (item === null ? 0 : item.quantity) + change});
    });
  }
}
