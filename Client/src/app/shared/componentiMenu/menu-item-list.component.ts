import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuItem } from '../../../model/menu.model';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-menu-item-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="bg-white rounded-lg shadow-md p-6">
      <h3 class="text-2xl font-bold mb-4 text-center">{{ categoryTitle }}</h3>
      <div class="space-y-4">
        <div *ngFor="let item of menuItems" class="flex justify-between items-center">
          <span class="text-lg">{{ item.name }}</span>
          <div class="flex items-center">
            <button 
              class="btn btn-outline btn-circle btn-sm" 
              (click)="decreaseQuantity(item)">
              -
            </button>
            <span class="mx-4 text-lg text-blue-500">{{ item.quantity }}</span>
            <button 
              class="btn btn-outline btn-circle btn-sm" 
              (click)="increaseQuantity(item, true)">
              +
            </button>
          </div>
        </div>
        <div class="flex items-center mt-4">
          <input type="checkbox" class="checkbox mr-2" [name]="'altro-' + category" [id]="'altro-' + category" />
          <label [for]="'altro-' + category" class="text-lg">Altro:</label>
          <input 
            #customItemInput
            type="text" 
            class="input input-bordered ml-2 flex-grow" 
            placeholder="___________________________"
          />
          <button 
            class="btn btn-sm btn-primary ml-2" 
            (click)="addCustomItem(customItemInput.value)">
            Aggiungi
          </button>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class MenuItemListComponent {
  @Input() menuItems: MenuItem[] = [];
  @Input() category = '';
  @Input() categoryTitle = '';
  @Input() customItemPrice = 0;
  @ViewChild('customItemInput') customItemInput!: ElementRef;

  constructor(private menuService: MenuService) {}

  increaseQuantity(item: MenuItem, addToOrder: boolean = false): void {
    this.menuService.increaseQuantity(item, addToOrder);
  }

  decreaseQuantity(item: MenuItem): void {
    this.menuService.decreaseQuantity(item);
  }

  addCustomItem(name: string): void {
    this.menuService.addCustomItem(name, this.category, this.customItemPrice);
    if (this.customItemInput) {
      this.customItemInput.nativeElement.value = '';
    }
  }
}