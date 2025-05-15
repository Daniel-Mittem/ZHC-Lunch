
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LogoComponent } from '../shared/Components/logo.component';
import { TitleComponent } from '../shared/Components/title.component';
import { ButtonComponent } from '../shared/Components/button.component';

@Component({
  selector: 'app-login-guest',
  standalone: true,
  imports: [CommonModule, FormsModule, LogoComponent, TitleComponent, ButtonComponent],
  template: `
    <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <!-- Logo -->
      <div class="absolute top-4 right-4">
        <app-logo width="80px" height="80px"></app-logo>
      </div>
      
      <!-- Titolo -->
      <app-title size="Titolo">Login ospite:</app-title>
      
      <!-- Form Login -->
      <div class="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <form #form="ngForm" (ngSubmit)="onSubmit()">
          <div class="mb-6">
            <label for="nome" class="block text-left font-medium mb-1">Nome:</label>
            <input
              id="nome"
              type="text"
              [(ngModel)]="nome"
              name="nome"
              required
              class="w-full border-b-2 border-black outline-none bg-transparent"
            />
          </div>
          
          <div class="mb-6">
            <label for="cognome" class="block text-left font-medium mb-1">Cognome:</label>
            <input
              id="cognome"
              type="text"
              [(ngModel)]="cognome"
              name="cognome"
              required
              class="w-full border-b-2 border-black outline-none bg-transparent"
            />
          </div>
          
          <!-- Pulsante -->
          <app-button
            label="Invio"
            type="submit"
            [disabled]="!form.valid"
          ></app-button>
        </form>
      </div>
    </div>
  `
})
export class LoginGuestComponent {
  nome = '';
  cognome = '';
  @Output() submitted = new EventEmitter<{ nome: string; cognome: string }>();

  constructor(private router: Router) {}

  onSubmit() {
    if (this.nome.trim() && this.cognome.trim()) {
      this.submitted.emit({ nome: this.nome, cognome: this.cognome });
      this.router.navigate(['/restaurant-selection']);
    }
  }
}