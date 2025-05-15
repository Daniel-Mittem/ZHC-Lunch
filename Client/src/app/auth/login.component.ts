// login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LogoComponent } from '../shared/Components/logo.component';
import { TitleComponent } from '../shared/Components/title.component';
import { AuthFormComponent } from '../shared/auth-form.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LogoComponent, TitleComponent, AuthFormComponent],
  template: `
    <!-- Logo -->
    <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div class="absolute top-4 right-4">
        <app-logo width="80px" height="80px"></app-logo> <!--shared logo -->
      </div>
    
      <!-- titolo -->
      <app-title size="Titolo">Login:</app-title> <!--shared titolo -->

    <!-- Card Login -->
      <app-auth-form [submitLabel]="'Login'" (submitted)="onLogin($event)"></app-auth-form> <!--shared auth-form -->
    </div>
  `,
})
export class LoginComponent {

/* 
  reindirizzamento a pagina restaurant-selection 
*/

  constructor(private router: Router) {}

  onLogin(credentials: { email: string; password: string }) {
    if (credentials.email && credentials.password) {
      this.router.navigate(['/restaurant-selection']);
    }
  }
}


