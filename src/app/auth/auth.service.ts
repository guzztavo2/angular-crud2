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
    const propUser = User.getActualUser();
    const actualUser = propUser == null ? false : true;
    return of(actualUser).pipe(
      delay(1000),
      tap(() => {
        if (actualUser !== false)
          localStorage.setItem('user', (propUser as User).toJson());
        this.isLoggedIn = actualUser;
      })
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
    localStorage.setItem('users', user.toJson());
  }

  logout(): void {
    this.isLoggedIn = false;
    localStorage.removeItem('user');
  }
}
