import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LogoComponent } from '../shared/Components/logo.component';
import { TitleComponent } from '../shared/Components/title.component';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [RouterModule, LogoComponent, TitleComponent],
  template: `
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-4">
      <!-- Logo -->
      <app-logo width="200px" height="150px"></app-logo>
      <!-- Titolo -->
      <app-title size="Titolo">Benvenuto su</app-title>
      <app-title size="Sottotitolo">ZHC Lunch Menu</app-title>

      <!-- Pulsanti -->
      <div class="flex flex-col md:flex-row gap-4 mb-6">
        <a
          routerLink="/login"
          class="bg-blue-500 hover:bg-blue-600 text-white underline font-semibold rounded-full px-8 py-2 transition duration-300"
        >
          Login
        </a>
        
        <a
          routerLink="/register"
          class="bg-blue-500 hover:bg-blue-600 text-white underline font-semibold rounded-full px-8 py-2 transition duration-300"
        >
          Registrati
        </a>
      </div>
    </div>
  `,
  styles: [],
})
export class WelcomeComponent {}
