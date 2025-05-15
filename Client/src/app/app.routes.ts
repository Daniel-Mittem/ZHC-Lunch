import { Routes } from '@angular/router';

//Benvenuto
import { WelcomeComponent } from './home/welcome.component';

//Login-Registrazione
import { LoginComponent } from './auth/login.component';
import { RegisterComponent } from './auth/register.component';

//Ospite
import { LoginGuestComponent } from './guest/login-guest.component';
import { ErrorGuestComponent } from './guest/error-guest.component';

//Scelta ristorante e Ordine
import { RestaurantSelectionComponent } from './restaurants/restaurant-selection.component';
import { MenuItemComponent } from './restaurants/menu-item.component';


//Ristoranti
import { MenuMarjgioComponent } from './restaurants/menu-marjgio.component';
import { MenuManuelaComponent } from './restaurants/menu-manuela.component';
import { MenuRamenComponent } from './restaurants/menu-ramen.component';

import { TimeSlotsComponent } from './bar/time-slots.component';
import { OrdersComponent } from './bar/orders.component';


export const routes: Routes = [
  //Pagina inizale
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },

  //Benvenuto
  { path: 'welcome', component: WelcomeComponent },

  //Login-Registrazione
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  
  //Ospite
  { path: 'login-guest', component: LoginGuestComponent },
  { path: 'error-guest', component: ErrorGuestComponent },

  //Scelta ristorante e Ordie
  { path: 'restaurant-selection', component: RestaurantSelectionComponent },
  { path: 'menu-item', component: MenuItemComponent },

  //Scelta menu
  { path: 'menu-marjgio', component: MenuMarjgioComponent },
  { path: 'menu-manuela', component: MenuManuelaComponent },
  { path: 'menu-ramen', component: MenuRamenComponent },
  
  { path: 'time-slots', component: TimeSlotsComponent },
  { path: 'orders', component: OrdersComponent },
];
