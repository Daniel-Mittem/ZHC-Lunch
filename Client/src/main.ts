import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes'; // o import AppRoutingModule se non hai routes standalone

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    // altri provider se servono
  ],
});


