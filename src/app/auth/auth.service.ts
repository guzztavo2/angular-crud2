import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { tap, delay, count } from 'rxjs/operators';
import User from './user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = false;

  redirectUrl: string | null = null;

  login(): Observable<boolean> {
    return of(true).pipe(
      delay(1000),
      tap(() => (this.isLoggedIn = true))
    );
  }

  getUser(): User | false {
    const user = User.getActualUser();

    if (user !== null) {
      this.isLoggedIn = true;
      return user;
    }

    this.isLoggedIn = false;

    return false;
  }

  register(user: User) {
    this.isLoggedIn = true;
    localStorage.setItem('users', JSON.stringify(user));
  }

  logout(): void {
    this.isLoggedIn = false;
    localStorage.removeItem('user');
  }
}
