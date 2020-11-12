import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './../services/product.service';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../models/product';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  subscription: Subscription;
  category: string;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
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
