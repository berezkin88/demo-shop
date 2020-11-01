import { UserService } from './user.service';
import { AppUser } from './../models/app-user';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { auth, User } from 'firebase';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<User>;

  constructor(
    private $auth: AngularFireAuth,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService) {
    this.user$ = this.$auth.authState;
  }

  get auth(): AngularFireAuth {
    return this.$auth;
  }

  login(): void {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    this.$auth.signInWithRedirect(new auth.GoogleAuthProvider());
  }

  logout(): void {
    this.auth.signOut();
  }

  get appUser$(): Observable<AppUser> {
    return this.user$.pipe(
      switchMap(user => {
          if (user) { return this.userService.get(user.uid).valueChanges(); }
          return of(null);
        }
      ));
  }
}
