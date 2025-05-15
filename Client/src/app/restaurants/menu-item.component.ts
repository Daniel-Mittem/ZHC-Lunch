import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface MenuItem {
  name: string;
  quantity: number;
}

interface Restaurant {
  name: string;
  items: MenuItem[];
}

@Component({
  selector: 'app-menu-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mx-auto px-4 py-8 max-w-4xl">
      <!-- Riepilogo ordine -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 class="text-2xl font-bold mb-4">Riepilogo ordine:</h2>
        
        <div class="space-y-4">
          <div *ngFor="let item of menuItems" class="flex justify-between items-center border-b pb-3">
            <div class="w-1/3 text-right pr-4">{{ item.name }}</div>
            <div class="w-1/3 text-center">
              <button class="btn btn-sm" (click)="modifyItem(item)">modifica</button>
            </div>
            <div class="w-1/3 flex items-center justify-center">
              <button class="btn btn-sm btn-circle" (click)="decrementQuantity(item)">-</button>
              <span class="mx-4 text-xl w-6 text-center">{{ item.quantity }}</span>
              <button class="btn btn-sm btn-circle" (click)="incrementQuantity(item)">+</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Fascia oraria -->
      <div class="bg-blue-600 text-white p-4 rounded-lg mb-6 flex items-center justify-between">
        <div class="text-xl font-bold">Fascia oraria:</div>
        <div class="bg-blue-500 border border-white rounded-full px-6 py-2">
          12.00 - 12.30
        </div>
      </div>

      <!-- Ristoranti -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div *ngFor="let restaurant of restaurants" class="bg-white rounded-lg shadow-md p-6">
          <h3 class="text-xl font-bold mb-4">{{ restaurant.name }}</h3>
          
          <div *ngFor="let item of restaurant.items" class="flex items-center py-2">
            <div class="w-16 text-lg font-medium">{{ item.quantity }}x</div>
            <div class="flex-grow text-lg">{{ item.name }}</div>
          </div>
        </div>
      </div>
    </div>
  `,
})

export class MenuItemComponent {
  menuItems: MenuItem[] = [
    { name: 'Pasta al tonno', quantity: 0 },
    { name: 'Tortelllini panna', quantity: 0 },
    { name: 'Risotto', quantity: 0 },
    { name: 'Insalata', quantity: 0 },
  ];

  restaurants: Restaurant[] = [
    {
      name: 'Biang Biang Ramen',
      items: [
        { name: 'Pasta al tonno', quantity: 1 },
        { name: 'Tortelllini panna', quantity: 1 },
      ]
    },
    {
      name: 'Bar Marigio',
      items: [
        { name: 'Pasta al tonno', quantity: 1 },
        { name: 'Tortelllini panna', quantity: 1 },
      ]
    }
  ];

  incrementQuantity(item: MenuItem): void {
    item.quantity++;
  }

  decrementQuantity(item: MenuItem): void {
    if (item.quantity > 0) {
      item.quantity--;
    }
  }

  modifyItem(item: MenuItem): void {
    // Implementazione della funzione di modifica
    console.log(`Modifica dell'elemento: ${item.name}`);
  }
}