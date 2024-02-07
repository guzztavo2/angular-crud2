import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, delay, count } from 'rxjs/operators';
import User from './user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = false;

  redirectUrl: string | null = null;

  public userSource = new BehaviorSubject(User);
  public currentUser = this.userSource.asObservable();

  login(): Observable<boolean> {
    const propUser = User.getActualUser();
    const actualUser = propUser == null ? false : true;
    return of(actualUser).pipe(
      delay(1000),
      tap(() => {
        if (actualUser !== false) {
          localStorage.setItem('user', (propUser as User).toJson());
          this.updateUser(propUser);
        }
        this.isLoggedIn = actualUser;
      })
    );
  }

  updateUser(user: any) {
    this.userSource.next(user);
  }


  register(user: User) {
    this.isLoggedIn = true;
    localStorage.setItem('users', user.toJson());
  }

  logout(): void {
    this.isLoggedIn = false;
    User.removeActualUser();
  }
}
