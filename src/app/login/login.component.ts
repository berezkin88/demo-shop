import { AngularFireAuth } from '@angular/fire/auth';
import { Component } from '@angular/core';
import { auth } from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {

  constructor(private $auth: AngularFireAuth) { }

  get auth(): AngularFireAuth {
    return this.$auth;
  }

  login(): void {
    this.$auth.signInWithRedirect(new auth.GoogleAuthProvider());
  }
}
