import { Observable } from 'rxjs';
import { Order } from 'shared/models/order';
import { ShoppingCartService } from './shopping-cart.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase, private cartService: ShoppingCartService) { }

  async placeOrder(order): Promise<firebase.database.Reference>  {
    const result = await this.db.list('/orders').push(order);
    this.cartService.clearCart();
    return result;
  }

  getOrders(): Observable<Order[]> {
    return this.db.list<Order>('/orders').valueChanges();
  }

  getOrdersByUserId(userId: string): Observable<Order[]> {
    return this.db.list<Order>('/orders', q => q.orderByChild('userId').equalTo(userId)).valueChanges();
  }
}
