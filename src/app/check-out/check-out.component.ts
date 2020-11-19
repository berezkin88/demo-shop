import { Router } from '@angular/router';
import { ShoppingCartService } from './../services/shopping-cart.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Cart } from '../models/cart';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.sass']
})
export class CheckOutComponent implements OnInit {
  cart$: Observable<Cart>;

  constructor(
    private cartService: ShoppingCartService,
    private router: Router) { }

  async ngOnInit(): Promise<void> {
    this.cart$ = await this.cartService.getCart();
  }

  checkOut(data): void {
    console.log(data);
    this.router.navigate(['/order-success/']);
  }
}
