import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem } from '../../../model/menu.model';
import { MenuService } from '../../services/menu.service';
import { OrderService } from '../../services/order.service';
import { ReservationService } from '../../services/reservation.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-lg shadow-md p-6 sticky top-4">
      <h3 class="text-2xl font-bold mb-6">Riepilogo ordine:</h3>
      
      <div *ngIf="orderItems.length === 0" class="text-gray-500 italic text-center py-4">
        Non hai ancora aggiunto elementi al tuo ordine
      </div>
      
      <div class="space-y-6">
        <div *ngFor="let item of orderItems" class="flex justify-between items-center">
          <div class="min-w-[150px]">
            <span class="text-lg">{{ item.name }}</span>
            <div *ngIf="item.extras" class="text-sm text-gray-500">
              {{ item.extras }}
            </div>
          </div>
          <button class="btn btn-sm btn-outline" (click)="addExtras(item)">aggiungi extra</button>
          <div class="flex items-center">
            <button 
              class="btn btn-outline btn-circle btn-sm" 
              (click)="decreaseQuantity(item)">
              -
            </button>
            <span class="mx-4 text-lg text-blue-500">{{ item.quantity }}</span>
            <button 
              class="btn btn-outline btn-circle btn-sm" 
              (click)="increaseQuantity(item)">
              +
            </button>
          </div>
        </div>
      </div>

      <!-- Totals Section -->
      <div class="mt-6 flex justify-between items-center">
        <div class="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg">
          <span class="text-xl font-bold mr-2">Totale:</span>
          <span class="text-xl">{{ totalAmount }} €</span>
        </div>
        <button 
          class="btn btn-primary" 
          [disabled]="orderItems.length === 0"
          (click)="confirmOrder()">
          Conferma ordine
        </button>
      </div>

      <!-- Confirmation message -->
      <div *ngIf="orderConfirmed" class="mt-4 p-3 bg-green-100 text-green-700 rounded-lg">
        Ordine confermato con successo! Troverai il tuo ordine nella sezione ordini.
        <div class="mt-2 flex justify-center">
          <button class="btn btn-sm btn-outline" (click)="viewOrders()">
            Visualizza ordini
          </button>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class OrderSummaryComponent implements OnInit, OnDestroy {
  orderItems: MenuItem[] = [];
  totalAmount = 0;
  private subscription?: Subscription;
  orderConfirmed = false;

  constructor(
    private menuService: MenuService,
    private orderService: OrderService,
    private reservationService: ReservationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscription = this.menuService.activeOrderItems$.subscribe(items => {
      this.orderItems = items;
      this.updateTotal();
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  increaseQuantity(item: MenuItem): void {
    this.menuService.increaseQuantity(item);
    this.updateTotal();
  }

  decreaseQuantity(item: MenuItem): void {
    this.menuService.decreaseQuantity(item);
    this.updateTotal();
  }

  addExtras(item: MenuItem): void {
    alert('Funzionalità per aggiungere extra da implementare');
  }

  confirmOrder(): void {
    if (this.orderItems.length === 0) return;
    
    // Get the current time slot from reservation service
    const timeSlot = this.reservationService.selectedTimeSlot || '12:30 - 13:00';
    
    // Add the order to the order service
    this.orderService.addOrder(this.orderItems, timeSlot, this.totalAmount);
    
    // Show confirmation message
    this.orderConfirmed = true;
    
    // Reset cart after a delay
    setTimeout(() => {
      this.menuService.activeOrderItems;
      this.orderConfirmed = false;
    }, 5000);
  }

  viewOrders(): void {
    // Navigate to time slots view
    this.router.navigate(['/time-slots']);
  }

  private updateTotal(): void {
    this.totalAmount = this.menuService.getTotalAmount();
  }
}