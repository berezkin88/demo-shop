import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from './../services/category.service';
import { ProductService } from './../services/product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Product } from '../models/product';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  subscription: Subscription;
  categories$: Observable<{ name: string }[]>;
  queryParam: string;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.queryParam = this.route.snapshot.queryParamMap.get('category');
    this.subscription = this.productService.getAll().subscribe((products) =>
      products.forEach((p) => {
        const prod: Product = p.payload.val();
        prod.key = p.key;
        this.filteredProducts.push(prod);
        this.products.push(prod);
      })
    );
    this.categories$ = this.categoryService.getCategories();
  }

  ngOnInit(): void {
    if (this.queryParam) {
      this.filter(this.queryParam);
    }
  }

  filter(query?): void {
    console.log(query);
    if (!query) {
      this.filteredProducts = this.products;
      this.router.navigate(['.']);
      return;
    }
    const matcher = this.popFirstWord(query);
    this.filteredProducts = this.products.filter((p) =>
      p.category.includes(matcher)
    );
    this.router.navigate(['.'], {
      relativeTo: this.route,
      queryParams: { category: matcher },
    });
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
