import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private _selectedRestaurantId: string = '';
  private _selectedTimeSlot: string = '';

  constructor() { }

  // Set the selected restaurant and time slot
  setReservation(restaurantId: string, timeSlot: string): void {
    this._selectedRestaurantId = restaurantId;
    this._selectedTimeSlot = timeSlot;
  }

  // Get the selected restaurant ID
  get selectedRestaurantId(): string {
    return this._selectedRestaurantId;
  }

  // Get the selected time slot
  get selectedTimeSlot(): string {
    return this._selectedTimeSlot;
  }
}