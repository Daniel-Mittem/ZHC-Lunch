import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MenuItem, ToastIngredient } from '../../model/menu.model';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private _activeOrderItems = new BehaviorSubject<MenuItem[]>([]);
  private _customItemId = 100;

  private firstCoursesData: MenuItem[] = [
    
  ];

  private secondCoursesData: MenuItem[] = [
    { id: 12, name: 'Tortel di patate con affettati e formaggi', category: 'secondi', quantity: 0, price: 12.00 },
    { id: 13, name: 'Cotoletta di pollo con patate', category: 'secondi', quantity: 0, price: 12.00 },
    { id: 14, name: 'hamburgher di manzo con patate', category: 'secondi', quantity: 0, price: 12.00 },
    { id: 15, name: 'Insalatona classica', category: 'secondi', quantity: 0, price: 8.00 },
    { id: 16, name: 'Insalata con carote, pomodoro, mais tonno e mozzarella', category: 'secondi', quantity: 0, price: 8.00 },
  ];

  private toastIngredientsData: ToastIngredient[] = [
    { id: 1, name: 'Sopressa', selected: false },
    { id: 2, name: 'Speck', selected: false },
    { id: 3, name: 'Pancetta', selected: false },
    { id: 4, name: 'Crudo', selected: false },
    { id: 5, name: 'Cotto', selected: false },
    { id: 6, name: 'Bologna', selected: false },
    { id: 7, name: 'Edamer', selected: false },
    { id: 8, name: 'Emmental', selected: false },
    { id: 9, name: 'Bree', selected: false },
    { id: 10, name: 'Mozzarella', selected: false },
    { id: 11, name: 'Maionese', selected: false },
    { id: 12, name: 'Tartara', selected: false },
    { id: 13, name: 'Senape', selected: false },
    { id: 14, name: 'Piccante', selected: false },
    { id: 15, name: 'Cocktail', selected: false },
    { id: 16, name: 'Ketchup', selected: false },
    { id: 17, name: 'Insalta', selected: false },
    { id: 18, name: 'Pomodoro', selected: false },
    { id: 19, name: 'Rucola', selected: false },
    { id: 20, name: 'Cetrioli', selected: false },
    { id: 21, name: 'Funghi', selected: false },
    { id: 22, name: 'Olive', selected: false },
    { id: 23, name: 'Pomodori secchi', selected: false },
  ];

  private piadinaIngredientsData: ToastIngredient[] = [
    { id: 1, name: 'Sopressa', selected: false },
    { id: 2, name: 'Speck', selected: false },
    { id: 3, name: 'Pancetta', selected: false },
    { id: 4, name: 'Crudo', selected: false },
    { id: 5, name: 'Cotto', selected: false },
    { id: 6, name: 'Bologna', selected: false },
    { id: 7, name: 'Edamer', selected: false },
    { id: 8, name: 'Emmental', selected: false },
    { id: 9, name: 'Bree', selected: false },
    { id: 10, name: 'Mozzarella', selected: false },
    { id: 11, name: 'Maionese', selected: false },
    { id: 12, name: 'Tartara', selected: false },
    { id: 13, name: 'Senape', selected: false },
    { id: 14, name: 'Piccante', selected: false },
    { id: 15, name: 'Cocktail', selected: false },
    { id: 16, name: 'Ketchup', selected: false },
    { id: 17, name: 'Insalta', selected: false },
    { id: 18, name: 'Pomodoro', selected: false },
    { id: 19, name: 'Rucola', selected: false },
    { id: 20, name: 'Cetrioli', selected: false },
    { id: 21, name: 'Funghi', selected: false },
    { id: 22, name: 'Olive', selected: false },
    { id: 23, name: 'Pomodori secchi', selected: false },
  ];

  private paniniIngredientsData: ToastIngredient[] = [
    { id: 1, name: 'Sopressa', selected: false },
    { id: 2, name: 'Speck', selected: false },
    { id: 3, name: 'Pancetta', selected: false },
    { id: 4, name: 'Crudo', selected: false },
    { id: 5, name: 'Cotto', selected: false },
    { id: 6, name: 'Bologna', selected: false },
    { id: 7, name: 'Edamer', selected: false },
    { id: 8, name: 'Emmental', selected: false },
    { id: 9, name: 'Bree', selected: false },
    { id: 10, name: 'Mozzarella', selected: false },
    { id: 11, name: 'Maionese', selected: false },
    { id: 12, name: 'Tartara', selected: false },
    { id: 13, name: 'Senape', selected: false },
    { id: 14, name: 'Piccante', selected: false },
    { id: 15, name: 'Cocktail', selected: false },
    { id: 16, name: 'Ketchup', selected: false },
    { id: 17, name: 'Insalta', selected: false },
    { id: 18, name: 'Pomodoro', selected: false },
    { id: 19, name: 'Rucola', selected: false },
    { id: 20, name: 'Cetrioli', selected: false },
    { id: 21, name: 'Funghi', selected: false },
    { id: 22, name: 'Olive', selected: false },
    { id: 23, name: 'Pomodori secchi', selected: false },
  ];

  get activeOrderItems$(): Observable<MenuItem[]> {
    return this._activeOrderItems.asObservable();
  }

  get activeOrderItems(): MenuItem[] {
    return this._activeOrderItems.value;
  }

  get firstCourses(): MenuItem[] {
    return [...this.firstCoursesData];
  }

  get secondCourses(): MenuItem[] {
    return [...this.secondCoursesData];
  }

  get toastIngredients(): ToastIngredient[] {
    return this.toastIngredientsData.map(i => ({ ...i, selected: false }));
  }

  get paniniIngredients(): ToastIngredient[] {
    return this.paniniIngredientsData.map(i => ({ ...i, selected: false }));
  }

  get piadineIngredients(): ToastIngredient[] {
    return this.piadinaIngredientsData.map(i => ({ ...i, selected: false }));
  }

  getTotalAmount(): number {
    return Number(this.activeOrderItems.reduce((total, item) =>
      total + (item.price * item.quantity), 0).toFixed(2));
  }

  increaseQuantity(item: MenuItem, addToOrder: boolean = false): void {
    item.quantity++;

    if (addToOrder && !this.activeOrderItems.includes(item)) {
      const newOrderItems = [...this.activeOrderItems, item];
      this._activeOrderItems.next(newOrderItems);
    } else {
      this._activeOrderItems.next([...this.activeOrderItems]);
    }
  }

  decreaseQuantity(item: MenuItem): void {
    if (item.quantity > 0) {
      item.quantity--;

      if (item.quantity === 0) {
        const index = this.activeOrderItems.indexOf(item);
        if (index !== -1) {
          const newOrderItems = [...this.activeOrderItems];
          newOrderItems.splice(index, 1);
          this._activeOrderItems.next(newOrderItems);
        }
      } else {
        this._activeOrderItems.next([...this.activeOrderItems]);
      }
    }
  }

  addCustomItem(name: string, category: string, price: number): void {
    if (!name.trim()) return;

    const newItem: MenuItem = {
      id: this._customItemId++,
      name,
      category,
      quantity: 1,
      price
    };

    const newOrderItems = [...this.activeOrderItems, newItem];
    this._activeOrderItems.next(newOrderItems);
  }

  addCustomIngredientItem(type: string, ingredients: string[], price: number): void {
    const name = type === 'toast' ? 'Toast' :
                 type === 'panino' ? 'Panino' :
                 type === 'piadina' ? 'Piadina' : 'Personalizzato';

    const newItem: MenuItem = {
      id: this._customItemId++,
      name,
      category: 'Panini',
      quantity: 1,
      extras: ingredients.join(', '),
      price
    };

    const newOrderItems = [...this.activeOrderItems, newItem];
    this._activeOrderItems.next(newOrderItems);
  }
}
