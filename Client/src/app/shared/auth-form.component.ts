import { Component, input, output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './Components/button.component';

@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent], 
  template: `
    <form #form="ngForm" (ngSubmit)="onSubmit()" class="w-full max-w-sm space-y-4">
      <input
        type="email"
        [(ngModel)]="email"
        name="email"
        required
        placeholder="Email"
        class="w-full p-2 border rounded"
      />

      <input
        type="password"
        [(ngModel)]="password"
        name="password"
        required
        placeholder="Password"
        class="w-full p-2 border rounded"
      />

      <!-- Conferma Password solo se è registrazione -->
      <input
        *ngIf="isRegister()"
        type="password"
        [(ngModel)]="confirmPassword"
        name="confirmPassword"
        required
        placeholder="Conferma Password"
        class="w-full p-2 border rounded"
      />

      <div
        *ngIf="isRegister() && password && confirmPassword && password !== confirmPassword"
        class="text-red-600 text-sm"
      >
        Le password non coincidono
      </div>

      <app-button
        [label]="submitLabel()"
        [disabled]="form.invalid || (isRegister() && password !== confirmPassword)"
        type="submit"
      ></app-button>
    </form>
  `,
})
export class AuthFormComponent {
  submitLabel = input('Invia');
  isRegister = input(false);
  submitted = output<{ email: string; password: string }>();

  email = '';
  password = '';
  confirmPassword = '';

  onSubmit() {
    if (!this.isRegister() || this.password === this.confirmPassword) {
      this.submitted.emit({ email: this.email, password: this.password });
    }
  }
}