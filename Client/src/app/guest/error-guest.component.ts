import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LogoComponent } from '../shared/Components/logo.component';
import { TitleComponent } from '../shared/Components/title.component'
import { ButtonComponent } from '../shared/Components/button.component';



@Component({
  selector: 'app-error-guest',
    imports: [LogoComponent, TitleComponent, ButtonComponent],
  template: `
<div class="min-h-screen bg-base-200 flex items-start justify-center pt-24">
  <div class="bg-white p-20 rounded-2xl shadow-xl max-w-xl text-center">
    <!-- Logo -->
    <div class="flex justify-center">
    <app-logo alt="Logo ZHC" class="h-15 mb-35"></app-logo>
    </div>
    
    <!-- Titolo -->
    <app-title size="Titolo">ERRORE!</app-title> <!--shared titolo -->

    <!-- Messaggio -->
    <p class="text-base text-gray-700 mb-6">
      Il tuo token come ospite è scaduto. Richiedi nuovamente il link ad uno dei dipendenti Zucchetti HC.
    </p>

    <!-- Bottone -->
    <app-button 
      (click)="goBack()" 
      class="flex justify-center"> </app-button>
  </div>
</div>
  `
})
export class ErrorGuestComponent {

  constructor(private router: Router) {}
  goBack() {
    this.router.navigate(['/welcome']);
  }
}
