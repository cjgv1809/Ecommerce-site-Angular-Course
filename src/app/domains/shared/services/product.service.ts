import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Product } from '../models/Product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // its needed to inject HttpClient to make requests to the server
  private http = inject(HttpClient);
  private baseUrl = 'https://fakestoreapi.com/products';

  constructor() {}

  getProducts(categoryName?: string): Observable<Product[]> {
    let url = this.baseUrl;
    if (categoryName) {
      url += `/category/${categoryName}`;
    }
    return this.http.get<Product[]>(url);
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }
}
