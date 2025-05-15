import { Component, EventEmitter, Input, Output, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastIngredient } from '../../../model/menu.model';

@Component({
  selector: 'app-ingredient-selector',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div *ngIf="visible" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-lg p-4 sm:p-6 w-full max-w-xl max-h-[90vh] overflow-hidden">
        <!-- Intestazione -->
        <div class="flex justify-between items-center mb-4 sm:mb-6 flex-wrap">
          <h3 class="text-xl sm:text-2xl font-bold">{{ title }}</h3>
          <div class="flex items-center mt-2 sm:mt-0">
            <span class="text-base sm:text-lg mr-2">Max 5 ingredienti:</span>
            <div class="badge badge-primary text-base sm:text-xl">{{ selectedCount }}</div>
          </div>
        </div>

        <!-- Contenuto scrollabile -->
        <div class="overflow-y-auto pr-1" style="max-height: 50vh;">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div *ngFor="let ingredient of ingredients" class="flex items-center">
              <input 
                type="checkbox"
                class="checkbox mr-2" 
                [id]="'ingredient-' + ingredient.id"
                [(ngModel)]="ingredient.selected"
                (change)="updateSelectedCount()"
                [disabled]="selectedCount >= 5 && !ingredient.selected"
              />
              <label [for]="'ingredient-' + ingredient.id" class="text-base truncate">{{ ingredient.name }}</label>
            </div>
          </div>
        </div>

        <!-- Altro ingrediente -->
        <div class="flex items-center mt-4 flex-wrap gap-2">
          <input type="checkbox" class="checkbox" disabled />
          <label class="text-base">Altro:</label>
          <input type="text" class="input input-bordered flex-grow" placeholder="Inserisci ingrediente..." #altroIngredient />
          <button 
            class="btn btn-sm btn-primary" 
            (click)="addCustomIngredient(altroIngredient.value)"
            [disabled]="selectedCount >= 5">
            Aggiungi
          </button>
        </div>

        <!-- Bottoni -->
        <div class="mt-5 flex justify-between">
          <button class="btn btn-outline" (click)="cancel()">Annulla</button>
          <button class="btn btn-primary" (click)="onConfirm()">Conferma</button>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class IngredientSelectorComponent {
  @Input() visible = false;
  @Input() title = '';
  @Input() ingredients: ToastIngredient[] = [];
  @Input() type = '';

  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<{ type: string, ingredients: string[] }>();

  @ViewChild('altroIngredient') altroIngredient!: ElementRef;

  selectedCount = 0;

  updateSelectedCount(): void {
    this.selectedCount = this.ingredients.filter(i => i.selected).length;
  }

  addCustomIngredient(name: string): void {
    if (!name.trim() || this.selectedCount >= 5) return;

    const newIngredient: ToastIngredient = {
      id: this.ingredients.length + 1,
      name: name.trim(),
      selected: true
    };

    this.ingredients.push(newIngredient);
    this.updateSelectedCount();
    if (this.altroIngredient) {
      this.altroIngredient.nativeElement.value = '';
    }
  }

  cancel(): void {
    this.close.emit();
  }

  onConfirm(): void {
    const selectedIngredients = this.ingredients.filter(i => i.selected).map(i => i.name);
    this.confirm.emit({
      type: this.type,
      ingredients: selectedIngredients
    });
  }
}
