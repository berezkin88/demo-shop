import { Cart } from './../models/cart';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.sass']
})
export class ShoppingCartSummaryComponent {
  @Input('cart') cart: Cart;

}
