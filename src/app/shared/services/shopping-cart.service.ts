import { Product } from 'shared/models/product';
import { Item } from 'shared/models/item';
import { Cart } from 'shared/models/cart';
import { take, map } from 'rxjs/operators';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { database } from 'firebase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  constructor(private db: AngularFireDatabase) {}

  async getCart(): Promise<Observable<Cart>> {
    const cartId = await this.getOrCreateCartId();
    return this.db
      .object<{ dateCreated: number; items: {} }>(`/shopping-carts/${cartId}`)
      .valueChanges()
      .pipe(map((x) => new Cart(x.items)));
  }

  async addToCart(product: Product): Promise<void> {
    this.updateItem(product, 1);
  }

  async removeFromCart(product: Product): Promise<void> {
    this.updateItem(product, -1);
  }

  async clearCart(): Promise<void> {
    const cartId = await this.getOrCreateCartId();
    this.db.object(`/shopping-carts/${cartId}/items`).remove();
  }

  private create(): database.ThenableReference {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
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
    return this.db.object<Item>(
      `/shopping-carts/${cartId}/items/${productKey}`
    );
  }

  private async updateItem(product: Product, change: number): Promise<void> {
    const cartId = await this.getOrCreateCartId();
    const item$ = this.getItem(cartId, product.key);
    item$
      .valueChanges()
      .pipe(take(1))
      .subscribe((item) => {
        let quant = (item === null ? 0 : item.quantity) + change;
        if (quant === 0) {
          item$.remove();
        } else {
          item$.update({
            title: product.title,
            imageUrl: product.imageUrl,
            price: product.price,
            quantity: (item === null ? 0 : item.quantity) + change,
          });
        }
      });
  }
}
