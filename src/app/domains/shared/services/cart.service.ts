import { Injectable, computed, signal } from '@angular/core';
import { Product } from '../models/Product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart = signal<Product[]>([]);
  total = computed(() => {
    const cart = this.cart();
    return cart.reduce((acc, product) => acc + product.price, 0);
  });

  constructor() {}

  addToCart(product: Product) {
    this.cart.update((prevCart) => [...prevCart, product]);
  }

  removeFromCart(product: Product) {
    this.cart.update((prevCart) => prevCart.filter((p) => p.id !== product.id));
  }
}
