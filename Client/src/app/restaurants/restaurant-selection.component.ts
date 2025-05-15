import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';  // Importa CommonModule per ngClass
import { LogoComponent } from '../shared/Components/logo.component';
import { RestaurantCardComponent } from '../shared/componentiRistoranti/restaurant-card.component';
import { TitleComponent } from "../shared/Components/title.component";

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
  selector: 'app-restaurant-selection',
  standalone: true,  // Abilitazione del componente standalone
  imports: [CommonModule, LogoComponent, RestaurantCardComponent, TitleComponent],  // Importazione dei componenti
  template: `
    <div class="container mx-auto px-4 py-6">
      <!-- Header con titolo e logo-->
      <div class="flex justify-between items-center mb-8">
        <app-title size="Titolo">Benvenuto, {{userName}}</app-title>
        <app-logo width="80px" height="80px"></app-logo>
      </div>

      <!-- Restaurant cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <app-restaurant-card 
          *ngFor="let restaurant of restaurants" 
          [restaurant]="restaurant"
          (timeSlotSelected)="openMenu($event)">
        </app-restaurant-card>
      </div>

      <!-- Action buttons -->
      <div class="flex justify-between items-center mb-4">
        <button class="btn btn-primary btn-lg rounded-full shadow-lg flex items-center space-x-2" (click)="inviteGuests()">
          <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
          </svg>
          <span>Invita ospiti</span>
        </button>

        <button class="btn btn-accent btn-lg rounded-full shadow-lg" (click)="showAllRestaurants()">
          Visualizza tutti
        </button>
      </div>

      <!-- Bottom bar with order summary button -->
      <div class="fixed bottom-0 left-0 right-0 bg-blue-600 text-white p-4 flex justify-center">
        <button class="btn btn-ghost btn-lg text-white font-bold text-xl" (click)="goToMenuItem()">
          Riepilogo ordini
        </button>
      </div>

      <!-- Copy link notification -->
      <div *ngIf="showCopyNotification" class="fixed top-10 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-lg transition-opacity duration-500">
        Link copiato!
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      padding-bottom: 60px; 
    }
  `]
})
export class RestaurantSelectionComponent implements OnInit {
  userName: string = '[nome utente]';  // Nome utente di esempio
  showCopyNotification: boolean = false;
  inviteLink: string = 'http://localhost:4200/login-guest';  // Link per l'invito agli ospiti

  restaurants: Restaurant[] = [
    {
      id: '1',
      name: 'Bar Marigio',
      icon: '🍳',
      visible: true,
      timeSlots: [
        { time: '12.00 - 12.30', bookings: 5 },
        { time: '12.30 - 13.00', bookings: 15 },
        { time: '13.00 - 13.30', bookings: 2 },
        { time: '13.30 - 14.00', bookings: 7 }
      ]
    },
    {
      id: '2',
      name: 'Biang Biang Ramen',
      icon: '🍜',
      visible: true,
      timeSlots: [
        { time: '12.00 - 12.30', bookings: 10 },
        { time: '12.30 - 13.00', bookings: 15 },
        { time: '13.00 - 13.30', bookings: 2 },
        { time: '13.30 - 14.00', bookings: 1 }
      ]
    },
    {
      id: '3',
      name: 'Bar Sant\'Ilario',
      icon: '🍸',
      visible: true,
      timeSlots: [
        { time: '12.00 - 12.30', bookings: 5 },
        { time: '12.30 - 13.00', bookings: 15 },
        { time: '13.00 - 13.30', bookings: 2 },
        { time: '13.30 - 14.00', bookings: 7 }
      ]
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.getUserInfo();  // Recupera le informazioni dell'utente
  }

  getUserInfo(): void {
    setTimeout(() => {
      this.userName = 'Marco';  // Imposta un nome utente di esempio
    }, 500);
  }

  toggleRestaurantVisibility(restaurant: Restaurant): void {
    restaurant.visible = !restaurant.visible;  // Mostra o nasconde un ristorante
  }

  showAllRestaurants(): void {
    this.restaurants.forEach(restaurant => {
      restaurant.visible = true;  // Mostra tutti i ristoranti
    });
  }

  inviteGuests(): void {
    navigator.clipboard.writeText(this.inviteLink).then(() => {
      this.showCopyNotification = true;  // Mostra la notifica quando il link è copiato
      setTimeout(() => {
        this.showCopyNotification = false;  // Nasconde la notifica dopo 3 secondi
      }, 3000);
    });
  }

  goToMenuItem(): void {
    this.router.navigate(['/menu-item']);  // Naviga al riepilogo ordini
  }

  openMenu(event: { restaurantId: string; timeSlot: string }) {
    this.router.navigate([`/restaurant/${event.restaurantId}`]);  // Naviga alla pagina del ristorante selezionato
  }
}
