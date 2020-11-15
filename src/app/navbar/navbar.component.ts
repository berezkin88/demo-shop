import { Cart } from './../models/cart';
import { ShoppingCartService } from './../services/shopping-cart.service';
import { AppUser } from './../models/app-user';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireObject } from '@angular/fire/database';
import { Observable } from 'rxjs';


@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit{
  appUser: AppUser;
  cart$: Observable<Cart>;

  constructor(
    private authService: AuthService,
    private cartService: ShoppingCartService) { }

  logout(): void {
    this.authService.logout();
  }

  async ngOnInit(): Promise<void> {
    this.authService.appUser$.subscribe(appUser => this.appUser = appUser);
    this.cart$ = await this.cartService.getCart();
  }
}
