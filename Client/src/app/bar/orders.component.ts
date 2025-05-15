import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OrderService, OrderRecord } from '../services/order.service';

interface OrderItem {
  quantity: string;
  dish: string;
  price: string;
  accepted: boolean;
  id: number;
  originalId?: string; // Reference to the original order ID
}

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mx-auto p-4 max-w-3xl">
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body p-0">
          <div class="flex justify-between items-center bg-base-100 p-4 rounded-t-lg">
            <h2 class="card-title text-xl">
              Ordini: {{ timeRange }} - {{ date }}
            </h2>
            <button class="btn btn-square" (click)="goBack()">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6">
                <path d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>

          <div class="overflow-x-auto">
            <table class="table w-full">
              <thead>
                <tr class="bg-blue-500 text-white">
                  <th class="text-left py-3 px-4">n° pietanze</th>
                  <th class="text-left py-3 px-4">Pietanze</th>
                  <th class="text-left py-3 px-4">Prezzo</th>
                  <th class="text-center py-3 px-4">Accettare</th>
                  <th class="text-center py-3 px-4">Rifiutare</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let order of orders" 
                    class="border-b" 
                    [ngClass]="{'bg-gray-200': order.id % 2 === 0}">
                  <td class="py-3 px-4">{{ order.quantity }}</td>
                  <td class="py-3 px-4">{{ order.dish }}</td>
                  <td class="py-3 px-4">{{ order.price }}</td>
                  <td class="py-3 px-4 text-center">
                    <button class="btn btn-circle btn-sm btn-success" (click)="acceptOrder(order)">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </button>
                  </td>
                  <td class="py-3 px-4 text-center">
                    <button class="btn btn-circle btn-sm btn-error" (click)="rejectOrder(order)">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div *ngIf="orders.length === 0" class="p-8 text-center text-gray-500">
            Nessun ordine trovato per questa fascia oraria
          </div>

          <div class="p-4 flex justify-center">
            <button 
              class="btn btn-primary btn-wide" 
              [disabled]="orders.length === 0"
              (click)="acceptAll()">
              Accetta Tutto
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class OrdersComponent implements OnInit {
  timeRange: string = '';
  date: string = '';
  orders: OrderItem[] = [];
  confirmedOrders: OrderRecord[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.timeRange = params['timeRange'] || '';
      this.date = params['date'] || '';
      this.loadOrders();
    });
  }

  loadOrders() {
    // Get real orders first
    this.confirmedOrders = this.orderService.getOrdersByDateAndTimeSlot(this.date, this.timeRange);
    
    if (this.confirmedOrders.length > 0) {
      // Transform the confirmed orders into the format expected by the UI
      let itemId = 1;
      this.orders = [];
      
      for (const order of this.confirmedOrders) {
        for (const item of order.items) {
          this.orders.push({
            id: itemId++,
            quantity: `${item.quantity}x`,
            dish: item.name + (item.extras ? ` (${item.extras})` : ''),
            price: `${(item.price * item.quantity).toFixed(2)} €`,
            accepted: false,
            originalId: order.id
          });
        }
      }
    } else {
      // If no real orders, create simulated ones based on date and time
      this.createSimulatedOrders();
    }
  }

  createSimulatedOrders() {
    // Extract day number to create some variation
    const dayOfMonth = parseInt(this.date.split('/')[0]);
    const timeSlotIndex = ['12:00 - 12:30', '12:30 - 13:00', '13:00 - 13:30', '13:30 - 14:00']
      .indexOf(this.timeRange);
    
    // Create some variety in orders based on date and time slot
    const orderCount = 3 + ((dayOfMonth + timeSlotIndex) % 5); // 3-7 orders
    
    const dishes = [
      'Pasta al pomodoro',
      'Pizza Margherita',
      'Insalata mista',
      'Risotto ai funghi',
      'Bistecca alla fiorentina'
    ];
    
    const prices = ['17.90 €', '12.50 €', '8.50 €', '16.90 €', '24.90 €'];
    
    this.orders = [];
    
    for (let i = 1; i <= orderCount; i++) {
      const dishIndex = (i + dayOfMonth) % dishes.length;
      const quantity = i % 3 === 0 ? '2x' : '1x';
      
      this.orders.push({
        id: i,
        quantity: quantity,
        dish: dishes[dishIndex],
        price: prices[dishIndex],
        accepted: false
      });
    }
  }

  acceptOrder(order: OrderItem) {
    order.accepted = true;
    console.log(`Order ${order.id} accepted`);
  }

  rejectOrder(order: OrderItem) {
    // If it's a real order, remove it from the order service
    if (order.originalId) {
      this.orderService.removeOrder(order.originalId);
    }
    
    // Remove the order from the list
    this.orders = this.orders.filter(o => o.id !== order.id);
    console.log(`Order ${order.id} rejected`);
  }

  acceptAll() {
    // Process all orders
    this.orders.forEach(order => {
      order.accepted = true;
    });
    console.log('All orders accepted');
    alert('Tutti gli ordini sono stati accettati!');
    this.goBack();
  }

  goBack() {
    this.router.navigate(['/time-slots']);
  }
}