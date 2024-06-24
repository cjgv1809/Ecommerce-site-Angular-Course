import { CommonModule } from '@angular/common';
import { Component, Input, inject, signal } from '@angular/core';
import { Product } from '@shared/models/Product.model';
import { CartService } from '@shared/services/cart.service';
import { ProductService } from '@shared/services/product.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent {
  // The id of the product to display
  @Input() id?: string;
  product = signal<Product | null>(null);
  private productService = inject(ProductService);
  private cartService = inject(CartService);

  ngOnInit() {
    this.getProduct();
  }

  addToCart() {
    const product = this.product();
    if (product) {
      this.cartService.addToCart(product);
    }
  }

  private getProduct() {
    if (this.id) {
      this.productService.getProduct(this.id).subscribe({
        next: (product) => {
          this.product.set(product);
        },
        error: (error) => {
          console.error(error);
        },
      });
    }
  }
}
