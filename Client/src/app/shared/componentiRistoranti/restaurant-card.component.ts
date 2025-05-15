import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { ReservationService } from '../../services/reservation.service';

interface TimeSlot {
  time: string;
  bookings: number;
}

interface Restaurant {
  id: string;
  name: string;
  icon: string;
  timeSlots: TimeSlot[];
  visible: boolean;
}

@Component({
  selector: 'app-restaurant-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div *ngIf="restaurant.visible" class="bg-white rounded-lg shadow-md p-6">
      <div class="flex justify-between items-center mb-4">
        <div class="flex items-center">
          <span class="mr-2 text-xl">{{restaurant.icon}}</span>
          <h2 class="text-xl font-bold">{{restaurant.name}}</h2>
        </div>
        <button class="btn btn-ghost btn-circle" (click)="toggleVisibility()">
          <svg *ngIf="restaurant.visible" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </button>
      </div>
      
      <p class="font-medium mb-2">Fasce orarie:</p>
      <div class="space-y-2">
        <div *ngFor="let slot of restaurant.timeSlots"
            class="py-1 px-2 rounded text-center flex justify-between cursor-pointer"
            [ngClass]="{
              'bg-green-400': slot.bookings < 5,
              'bg-orange-400': slot.bookings >= 5 && slot.bookings < 10,
              'bg-red-400': slot.bookings >= 10
            }"
            (click)="onTimeSlotClick(slot)">
            <span>{{slot.time}}</span>
            <span>{{slot.bookings}} prenotati</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .card {
      margin-bottom: 20px;
    }
  `]
})
export class RestaurantCardComponent {
  @Input() restaurant: Restaurant = { id: '', name: '', icon: '', timeSlots: [], visible: true };
  @Output() timeSlotSelected = new EventEmitter<{ restaurantId: string, timeSlot: string }>();
  
  constructor(
    private router: Router,
    private reservationService: ReservationService
  ) {}
  
  toggleVisibility(): void {
    this.restaurant.visible = !this.restaurant.visible;
  }
  
  onTimeSlotClick(slot: TimeSlot): void {
    const restaurantId = this.restaurant.id;
    
    // Save the selected time slot to the shared service
    this.reservationService.setReservation(restaurantId, slot.time);
    
    // Emit event for parent components
    this.timeSlotSelected.emit({ restaurantId, timeSlot: slot.time });
    
    // Navigate to the appropriate menu page
    if (restaurantId === '1') {
      this.router.navigate(['/menu-marjgio']);
    } else if (restaurantId === '2') {
      this.router.navigate(['/menu-ramen']);
    } else if (restaurantId === '3') {
      this.router.navigate(['/menu-manuela']);
    }
  }
}