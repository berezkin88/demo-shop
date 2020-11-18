import { Cart } from './../models/cart';
import { ShoppingCartService } from './../services/shopping-cart.service';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  cart: Cart;
  cart$: Observable<Cart>;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private shoppingCartService: ShoppingCartService
  ) { }

  async ngOnInit(): Promise<void> {
    this.cart$ = await this.shoppingCartService.getCart();

    this.populateProducts();
  }

  private populateProducts(): void {
    this.productService
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
      this.filter();
    });
  }

  private filter(): void {
    this.filteredProducts = this.category
      ? this.products.filter((p) =>
        p.category.includes(this.popFirstWord(this.category)))
      : this.products;
  }

  private popFirstWord(input: string): string {
    if (!input) {
      return;
    }
    return input.split(' ', 1)[0];
  }
}
