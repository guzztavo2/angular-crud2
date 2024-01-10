import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import User from './user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string | null = null;

  login(): Observable<boolean> {
    return of(true).pipe(
      delay(1000),
      tap(() => (this.isLoggedIn = true))
    );
  }

  getUser(): User | false {
    const result = localStorage.getItem('user');

    if (result !== null) {
      let user = JSON.parse(result);

      this.isLoggedIn = true;

      return new User(user.name, user.email, user.password);
    }

    this.isLoggedIn = false;

    return false;
  }

  register(user: User) {
    this.isLoggedIn = true;
    localStorage.setItem('user', JSON.stringify(user));
  }

  logout(): void {
    this.isLoggedIn = false;
    localStorage.removeItem('user');
  }
}
