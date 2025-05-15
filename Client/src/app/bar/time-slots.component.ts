import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OrderService } from '../services/order.service';
import { Subscription } from 'rxjs';

interface TimeSlot {
  timeRange: string;
  bookingsCount: number;
  colorClass: string;
  date: string;
}

@Component({
  selector: 'app-time-slots',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mx-auto p-4 max-w-md">
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body p-0">
          <div class="flex justify-between items-center bg-base-100 p-4 rounded-t-lg">
            <button class="btn btn-circle btn-sm" (click)="changeDate(-1)">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div class="text-center">
              <h2 class="card-title text-xl mb-0">Ordini del giorno:</h2>
              <p class="text-lg font-medium">{{ currentDate }}</p>
            </div>
            <button class="btn btn-circle btn-sm" (click)="changeDate(1)">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div class="p-4">
            <div class="grid grid-cols-2 gap-4">
              <div class="text-lg font-medium">Fasce orarie:</div>
              <div class="text-lg font-medium text-right">Prenotato:</div>
            </div>
          </div>

          <div class="p-4 pt-0">
            <div *ngFor="let slot of timeSlots" class="mb-3">
              <div 
                class="grid grid-cols-2 gap-4 p-4 rounded-lg cursor-pointer"
                [ngClass]="slot.colorClass"
                (click)="viewOrders(slot)">
                <div class="text-lg">{{ slot.timeRange }}</div>
                <div class="text-lg text-right">{{ slot.bookingsCount }}</div>
              </div>
            </div>
          </div>

          <div class="p-4 flex justify-center">
            <button class="btn btn-primary btn-wide" (click)="exportData()">
              Esporta
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class TimeSlotsComponent implements OnInit, OnDestroy {
  currentDate = '';
  timeSlots: TimeSlot[] = [];
  private subscription?: Subscription;

  // Default time slots with their ranges
  private defaultTimeSlots = [
    '12:00 - 12:30',
    '12:30 - 13:00',
    '13:00 - 13:30',
    '13:30 - 14:00'
  ];

  constructor(
    private router: Router,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    // Set current date on initialization
    this.setCurrentDate();
    
    // Subscribe to confirmed orders to update counts
    this.subscription = this.orderService.confirmedOrders$.subscribe(() => {
      this.loadTimeSlots();
    });
    
    this.loadTimeSlots();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  setCurrentDate() {
    const today = new Date();
    const day = today.getDate().toString().padStart(2, '0');
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const year = today.getFullYear();
    this.currentDate = `${day}/${month}/${year}`;
  }

  loadTimeSlots() {
    // Get actual orders for each time slot
    this.timeSlots = this.defaultTimeSlots.map(timeRange => {
      const orders = this.orderService.getOrdersByDateAndTimeSlot(this.currentDate, timeRange);
      const bookingsCount = orders.length;
      
      // Determine color class based on booking count
      let colorClass = 'bg-green-500 text-white';
      if (bookingsCount > 8) {
        colorClass = 'bg-red-500 text-white';
      } else if (bookingsCount > 5) {
        colorClass = 'bg-orange-400 text-white';
      }
      
      return {
        timeRange,
        bookingsCount,
        colorClass,
        date: this.currentDate
      };
    });
    
    // If there are no orders for the day, add some simulated ones
    if (this.timeSlots.every(slot => slot.bookingsCount === 0)) {
      this.addSimulatedOrders();
    }
  }

  // Add simulated orders if there are no real orders
  private addSimulatedOrders() {
    const dayOfMonth = parseInt(this.currentDate.split('/')[0]);
    
    this.timeSlots = this.defaultTimeSlots.map((timeRange, index) => {
      // Use the day number to create some variation in booking counts
      let bookingsCount;
      switch (index) {
        case 0:
          bookingsCount = 8 + (dayOfMonth % 5);  // Range 8-12
          break;
        case 1:
          bookingsCount = Math.max(1, 3 - (dayOfMonth % 3));  // Range 1-3
          break;
        case 2:
          bookingsCount = 2 + (dayOfMonth % 4);  // Range 2-5
          break;
        case 3:
          bookingsCount = 4 + (dayOfMonth % 4);  // Range 4-7
          break;
        default:
          bookingsCount = 0;
      }

      // Determine color class based on booking count
      let colorClass = 'bg-green-500 text-white';
      if (bookingsCount > 8) {
        colorClass = 'bg-red-500 text-white';
      } else if (bookingsCount > 5) {
        colorClass = 'bg-orange-400 text-white';
      }
      
      return {
        timeRange,
        bookingsCount,
        colorClass,
        date: this.currentDate
      };
    });
  }

  changeDate(offset: number) {
    // Parse the current date
    const [day, month, year] = this.currentDate.split('/').map(num => parseInt(num));
    
    // Create a Date object and add/subtract days
    const date = new Date(year, month - 1, day);
    date.setDate(date.getDate() + offset);
    
    // Format the new date as DD/MM/YYYY
    const newDay = date.getDate().toString().padStart(2, '0');
    const newMonth = (date.getMonth() + 1).toString().padStart(2, '0');
    const newYear = date.getFullYear();
    
    // Update the current date
    this.currentDate = `${newDay}/${newMonth}/${newYear}`;
    
    // Reload time slots for the new date
    this.loadTimeSlots();
  }

  viewOrders(slot: TimeSlot) {
    // Navigate to the orders page with the selected time slot
    this.router.navigate(['/orders'], { 
      queryParams: { 
        timeRange: slot.timeRange,
        date: slot.date 
      }
    });
  }

  exportData() {
    console.log('Exporting data...');
    // Implementation for exporting data would go here
    alert('Dati esportati con successo!');
  }
}