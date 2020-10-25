import { AngularFireAuth } from '@angular/fire/auth';
import { Component } from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent {

  constructor(private $auth: AngularFireAuth) { }

  get auth(): AngularFireAuth {
    return this.$auth;
  }

  logout(): void {
    this.auth.signOut();
  }
}
