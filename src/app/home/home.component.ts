import { Cart } from './../models/cart';
import { ShoppingCartService } from './../services/shopping-cart.service';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './../services/product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../models/product';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnDestroy, OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  subscription: Subscription;
  category: string;
  cart: Cart;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private shoppingCartService: ShoppingCartService
  ) {
    this.subscription = this.productService
      .getAll()
      .pipe(
        switchMap(
          products => {
            products.forEach((p) => {
            const prod: Product = p.payload.val();
            prod.key = p.key;
            this.filteredProducts.push(prod);
            this.products.push(prod);
          });
            return this.route.queryParamMap;
          }))
        .subscribe((params) => {
        this.category = params.get('category');
        this.filter(this.category);
      });
  }

  async ngOnInit(): Promise<void> {
    this.subscription.add((await this.shoppingCartService.getCart()).subscribe(cart => this.cart = cart));
  }

  filter(query): void {
    this.filteredProducts = query
      ? this.products.filter((p) =>
          p.category.includes(this.popFirstWord(query)))
      : this.products;
  }

  private popFirstWord(input: string): string {
    if (!input) {
      return;
    }
    return input.split(' ', 1)[0];
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
