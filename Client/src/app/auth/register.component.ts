// register.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LogoComponent } from '../shared/Components/logo.component';
import { TitleComponent } from '../shared/Components/title.component';
import { AuthFormComponent } from '../shared/auth-form.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [LogoComponent, TitleComponent, AuthFormComponent],
  template: `
    <!-- logo -->
    <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div class="absolute top-4 right-4">
        <app-logo width="80px" height="80px"></app-logo> <!--shared/components/logo -->
      </div>

    <!-- Titolo -->
      <app-title size="Titolo">Registrazione:</app-title> <!--shared/components/titolo -->

    <!-- Card Registrazione -->
      <app-auth-form [submitLabel]="'Registrati'" [isRegister]="true" (submitted)="onRegister($event)"></app-auth-form> <!--shared auth-form -->
    </div>
  `,
})
export class RegisterComponent {

/* 
  reindirizzamento a pagina restaurant-selection 
*/

  constructor(private router: Router) {}

  onRegister(credentials: { email: string; password: string }) {
    this.router.navigate(['/restaurant-selection']);
  }
}
