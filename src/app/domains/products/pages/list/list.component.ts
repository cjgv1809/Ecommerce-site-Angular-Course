import { Component, Input, SimpleChanges, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLinkWithHref } from '@angular/router';
import { ProductsComponent } from '@products/components/products/products.component';
import { Product } from '@shared/models/Product.model';
import { HeaderComponent } from '@shared/components/header/header.component';
import { CartService } from '@shared/services/cart.service';
import { ProductService } from '@shared/services/product.service';
import { CategoryService } from '@shared/services/category.service';
import { Category } from '@shared/models/Category.model';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    ProductsComponent,
    HeaderComponent,
    RouterLinkWithHref,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  products = signal<Product[]>([]);
  categories = signal<Category[]>([]);
  activeCategory: string = '';
  private cartService = inject(CartService);
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  @Input() categoryName?: string;

  ngOnInit() {
    this.getCategories();
    this.getProducts();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['categoryName'] && !changes['categoryName'].isFirstChange()) {
      this.getProducts();
    }
  }

  private getProducts() {
    this.productService.getProducts(this.categoryName).subscribe({
      next: (products) => {
        this.products.set(products);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  private getCategories() {
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categories.set(categories);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  filterProducts(categoryName: string) {
    this.categoryName = categoryName;
    this.activeCategory = categoryName; // Set active category for styling
    this.getProducts(); // Fetch products immediately after setting category
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
