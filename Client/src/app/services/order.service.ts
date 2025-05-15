import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MenuItem } from '../../model/menu.model';

export interface OrderRecord {
  items: MenuItem[];
  timestamp: Date;
  timeSlot: string;
  totalAmount: number;
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private confirmedOrdersSubject = new BehaviorSubject<OrderRecord[]>([]);
  public confirmedOrders$ = this.confirmedOrdersSubject.asObservable();
  
  constructor() {
    // Try to load any saved orders from localStorage
    this.loadSavedOrders();
  }

  private loadSavedOrders(): void {
    const savedOrders = localStorage.getItem('confirmedOrders');
    if (savedOrders) {
      try {
        const parsedOrders = JSON.parse(savedOrders) as OrderRecord[];
        // Convert string dates back to Date objects
        const processedOrders = parsedOrders.map(order => ({
          ...order,
          timestamp: new Date(order.timestamp)
        }));
        this.confirmedOrdersSubject.next(processedOrders);
      } catch (error) {
        console.error('Error loading saved orders:', error);
        this.confirmedOrdersSubject.next([]);
      }
    }
  }

  private saveOrdersToStorage(orders: OrderRecord[]): void {
    localStorage.setItem('confirmedOrders', JSON.stringify(orders));
  }

  addOrder(items: MenuItem[], timeSlot: string, totalAmount: number): string {
    const currentOrders = this.confirmedOrdersSubject.value;
    const newOrderId = `order-${Date.now()}`;
    
    const newOrder: OrderRecord = {
      items: JSON.parse(JSON.stringify(items)), // Deep copy to prevent reference issues
      timestamp: new Date(),
      timeSlot,
      totalAmount,
      id: newOrderId
    };
    
    const updatedOrders = [...currentOrders, newOrder];
    this.confirmedOrdersSubject.next(updatedOrders);
    this.saveOrdersToStorage(updatedOrders);
    
    return newOrderId;
  }

  getOrdersByDate(date: string): OrderRecord[] {
    // The date parameter is expected in 'DD/MM/YYYY' format
    return this.confirmedOrdersSubject.value.filter(order => {
      const orderDate = order.timestamp;
      const day = orderDate.getDate().toString().padStart(2, '0');
      const month = (orderDate.getMonth() + 1).toString().padStart(2, '0');
      const year = orderDate.getFullYear();
      const formattedDate = `${day}/${month}/${year}`;
      
      return formattedDate === date;
    });
  }

  getOrdersByDateAndTimeSlot(date: string, timeSlot: string): OrderRecord[] {
    const dateOrders = this.getOrdersByDate(date);
    return dateOrders.filter(order => order.timeSlot === timeSlot);
  }

  removeOrder(orderId: string): void {
    const currentOrders = this.confirmedOrdersSubject.value;
    const updatedOrders = currentOrders.filter(order => order.id !== orderId);
    this.confirmedOrdersSubject.next(updatedOrders);
    this.saveOrdersToStorage(updatedOrders);
  }

  clearAllOrders(): void {
    this.confirmedOrdersSubject.next([]);
    localStorage.removeItem('confirmedOrders');
  }
}