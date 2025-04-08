import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  private userData: any = null;

  constructor(private router: Router) {
    const saved = localStorage.getItem('isLoggedIn');
    if (saved === 'true') {
      this.isAuthenticated.next(true);
      this.userData = JSON.parse(localStorage.getItem('user') || '{}');
    }
  }

  login(email: string, password: string): Observable<boolean> {
    return of(email === 'admin@admin.com' && password === '123456').pipe(
      delay(500),
      tap(isAuth => {
        if (isAuth) {
          this.isAuthenticated.next(true);
          this.userData = { email, role: 'admin' };
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('user', JSON.stringify(this.userData));

          this.router.navigate(['/usuarios']);
        }
      })
    );
  }

  logout(): void {
    this.isAuthenticated.next(false);
    this.userData = null;

    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');

    this.router.navigate(['/login']);
  }

  isLoggedIn(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  getUserData(): any {
    return this.userData;
  }
}
