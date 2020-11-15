import { Component, Input } from '@angular/core';
import { Cart } from '../models/cart';
import { Item } from '../models/item';
import { Product } from '../models/product';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.sass']
})
export class ProductQuantityComponent {
  @Input('product') product: Product;
  @Input('shopping-cart') cart: Cart;

  constructor(private cartService: ShoppingCartService) { }

  addToCart(): void {
    this.cartService.addToCart(this.product);
  }

  removeFromCart(): void {
    this.cartService.removeFromCart(this.product);
  }
}
