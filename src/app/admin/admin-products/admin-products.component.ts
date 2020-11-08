import { Product } from './../../models/product';
import { ProductService } from './../../services/product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { updatePartiallyEmittedExpression } from 'typescript';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.sass'],
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  subscription: Subscription;

  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll().subscribe((products) =>
      products.forEach((p) => {
        const prod: Product = p.payload.val();
        prod.key = p.key;
        this.filteredProducts.push(prod);
        this.products.push(prod);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  filter(query: string): void {
    this.filteredProducts = query
      ? this.products.filter((p) =>
          p.title.toLowerCase().includes(query.toLowerCase())
        )
      : this.products;
  }

  ngOnInit(): void {}
}
