import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sandwiches-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 class="text-2xl font-bold mb-4">Panini, Piadine e Toast</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <!-- Panino -->
        <div class="flex flex-col items-center justify-center space-y-2">
          <span class="text-lg font-medium">Panino</span>
          <button class="btn btn-primary" (click)="showPaniniIngredientSelector()">
            Scegli ingredienti
          </button>
        </div>

        <!-- Piadina -->
        <div class="flex flex-col items-center justify-center space-y-2">
          <span class="text-lg font-medium">Piadina</span>
          <button class="btn btn-primary" (click)="showPaniniIngredientSelector()">
          Scegli ingredienti
          </button>
        </div>

        <!-- Toast -->
        <div class="flex flex-col items-center justify-center space-y-2">
          <span class="text-lg font-medium">Toast</span>
          <button class="btn btn-primary" (click)="showToastIngredientSelector()">
          Scegli ingredienti
          </button>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class PaniniSectionComponent {
  constructor() {}

  showPiadinaIngredientSelector(): void {
    const event = new CustomEvent('showIngredientSelector', { 
      detail: { type: 'piadina', title: 'Ingredienti Piadina' } 
    });
    window.dispatchEvent(event);
  }

  showToastIngredientSelector(): void {
    const event = new CustomEvent('showIngredientSelector', { 
      detail: { type: 'toast', title: 'Ingredienti Toast' } 
    });
    window.dispatchEvent(event);
  }

  showPaniniIngredientSelector(): void {
    const event = new CustomEvent('showIngredientSelector', { 
      detail: { type: 'panino', title: 'Ingredienti Panino' } 
    });
    window.dispatchEvent(event);
  }
}