import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
import { TimeAgoPipe } from '@shared/pipes/time-ago.pipe';
import { Product } from '@shared/models/Product.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, TimeAgoPipe, RouterLinkWithHref],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  @Input({ required: true }) product!: Product;

  @Output() addToCart = new EventEmitter();

  addToCartHandler() {
    this.addToCart.emit(this.product);
  }
}
