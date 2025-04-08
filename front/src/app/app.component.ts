import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: '<router-outlet></router-outlet>',
})
export class AppComponent {
  constructor(private authService: AuthService) {
    this.authService.isLoggedIn().subscribe(isAuth => {
      if (isAuth) {
        console.log('Usuário autenticado!');
      }
    });
  }
}
