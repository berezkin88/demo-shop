import { AppUser } from './../models/app-user';
import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';


@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent {
  appUser: AppUser;

  constructor(private authService: AuthService) {
    authService.appUser$.subscribe(appUser => this.appUser = appUser);
  }

  logout(): void {
    this.authService.logout();
  }
}
