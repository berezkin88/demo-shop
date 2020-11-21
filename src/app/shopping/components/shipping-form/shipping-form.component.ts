import { Cart } from 'shared/models/cart';
import { AuthService } from 'shared/services/auth.service';
import { Router } from '@angular/router';
import { Order } from 'shared/models/order';
import { OrderService } from 'shared/services/order.service';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.sass']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input('cart') cart: Cart;
  shipping: ShippingInfo = {} as ShippingInfo;
  userSubscription: Subscription;
  userId: string;

  constructor(private orderService: OrderService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  async checkOut(data): Promise<void> {
    const order = new Order(this.userId, this.shipping, this.cart);
    const result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success/', result.key]);
  }

}

interface ShippingInfo {
  name: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
}
