import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RestaurantHeaderComponent } from '../shared/componentiMenu/restaurant-header.component';
import { MenuItemListComponent } from '../shared/componentiMenu/menu-item-list.component';
import { PaniniSectionComponent} from '../shared/componentiMenu/panini-selection.component';
import { OrderSummaryComponent } from '../shared/componentiMenu/order-summary.component';
import { IngredientSelectorComponent } from '../shared/componentiMenu/ingredient-selector.component';
import { MenuService } from '../services/menu.service';
import { ReservationService } from '../services/reservation.service';
import { ToastIngredient } from '../../model/menu.model';

@Component({
  selector: 'app-menu-marjgio',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RestaurantHeaderComponent,
    MenuItemListComponent,
    PaniniSectionComponent,
    OrderSummaryComponent,
    IngredientSelectorComponent
  ],
  template: `
    <!-- Restaurant Header -->
    <app-restaurant-header
      [restaurantName]="restaurantName"
      [reservationTime]="reservationTime"
      [remainingTime]="remainingTime">
    </app-restaurant-header>

    <!-- Main Content Grid: Menu + Order Summary Side by Side on larger screens -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
      
      <!-- Menu Section - Takes 2/3 of the screen on larger displays -->
      <div class="lg:col-span-2">
        <!-- First and Second Courses in a grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <!-- First Courses -->
          <app-menu-item-list
            [menuItems]="firstCourses"
            category="primi"
            categoryTitle="Primi"
            [customItemPrice]="8.50">
          </app-menu-item-list>

          <!-- Second Courses -->
          <app-menu-item-list
            [menuItems]="secondCourses"
            category="secondi"
            categoryTitle="Secondi"
            [customItemPrice]="12.00">
          </app-menu-item-list>
        </div>

        <!-- Sandwiches and Toast Section -->
        <app-sandwiches-section></app-sandwiches-section>
      </div>

      <!-- Order Summary - Takes 1/3 of the screen on larger displays -->
      <div class="lg:col-span-1">
        <app-order-summary></app-order-summary>
      </div>
    </div>

    <!-- Ingredient Selector Modal -->
    <app-ingredient-selector
      [visible]="showIngredientSelector"
      [title]="ingredientSelectorTitle"
      [ingredients]="ingredients"
      [type]="currentItemType"
      (close)="cancelIngredientSelection()"
      (confirm)="confirmIngredientSelection($event)">
    </app-ingredient-selector>
  `,
  styles: []
})
export class MenuMarjgioComponent implements OnInit, OnDestroy {
  restaurantName = 'Bar Marjgio';
  reservationTime = '12:30';
  remainingTime = '45:00';
  
  firstCourses: any[] = [];
  secondCourses: any[] = [];
  
  showIngredientSelector = false;
  ingredientSelectorTitle = '';
  ingredients: ToastIngredient[] = [];
  currentItemType = '';
  
  constructor(
    private menuService: MenuService,
    private reservationService: ReservationService
  ) { }

  ngOnInit(): void {
    // Initialize the courses after menuService is injected
    this.firstCourses = this.menuService.firstCourses;
    this.secondCourses = this.menuService.secondCourses;
    this.setupEventListeners();
    
    // Get the selected time slot from the reservation service
    if (this.reservationService.selectedTimeSlot) {
      this.reservationTime = this.reservationService.selectedTimeSlot;
    }
  }

  ngOnDestroy(): void {
    this.removeEventListeners();
  }

  setupEventListeners(): void {
    window.addEventListener('showIngredientSelector', this.handleShowIngredientSelector);
  }

  removeEventListeners(): void {
    window.removeEventListener('showIngredientSelector', this.handleShowIngredientSelector);
  }

  @HostListener('window:showIngredientSelector', ['$event'])
  handleShowIngredientSelector(event: any): void {
    const { type, title } = event.detail;
    this.currentItemType = type;
    this.ingredientSelectorTitle = title;
    
    if (type === 'toast') {
      this.ingredients = this.menuService.toastIngredients;
    } else if (type === 'panino') {
      this.ingredients = this.menuService.paniniIngredients;
    }
    
    this.showIngredientSelector = true;
  }

  cancelIngredientSelection(): void {
    this.showIngredientSelector = false;
  }

  confirmIngredientSelection(event: { type: string, ingredients: string[] }): void {
    const { type, ingredients } = event;
    const price = type === 'toast' ? 4.50 : 6.00;
    
    this.menuService.addCustomIngredientItem(type, ingredients, price);
    this.showIngredientSelector = false;
  }
}