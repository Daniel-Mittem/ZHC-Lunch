import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from "../Components/logo.component";

@Component({
  selector: 'app-restaurant-header',
  standalone: true,
  imports: [CommonModule, LogoComponent],
  template: `
    <div class="px-4 py-4 bg-white rounded-lg shadow-md">
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold">{{ restaurantName }}</h1>
        <div class="w-24 h-24">
            <!-- Logo -->
          <app-logo class="w-full h-full object-contain"></app-logo> <!--shared logo -->
        </div>
      </div>

      <!-- Reservation Time Slot Info -->
      <div class="mt-4">
        <div class="flex items-center mb-2">
          <span class="text-base mr-2">Fascia oraria prenotata:</span>
          <div class="bg-blue-500 text-white rounded-full px-8 py-2">{{ reservationTime }}</div>
        </div>
        <div class="flex items-center">
          <span class="text-base mr-2">Tempo rimanente per la prenotazione:</span>
          <div class="bg-blue-500 text-white rounded-full px-8 py-2">{{ remainingTime }}</div>
        </div>
      </div>

      <h2 class="text-5xl font-bold text-center mt-4 mb-8">Menu</h2>
    </div>
  `,
  styles: []
})
export class RestaurantHeaderComponent {
  @Input() restaurantName = '';
  @Input() reservationTime = '';
  @Input() remainingTime = '';
}