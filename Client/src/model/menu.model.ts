export interface MenuItem {
  id: number;
  name: string;
  category: string;
  quantity: number;
  extras?: string;
  price: number;
}

export interface ToastIngredient {
  id: number;
  name: string;
  selected: boolean;
}