import { Component, inject, signal } from '@angular/core';
import { CartService } from '@shared/services/cart.service';
import { RouterLinkActive, RouterLinkWithHref } from '@angular/router';
import { Product } from '@shared/models/Product.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLinkWithHref, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  hideSideMenu = signal<boolean>(true);
  private cartService = inject(CartService);
  cart = this.cartService.cart;
  total = this.cartService.total;

  toggleSideMenu() {
    this.hideSideMenu.update((prevState) => !prevState);
  }

  removeFromCart(product: Product) {
    this.cartService.removeFromCart(product);
  }
}
