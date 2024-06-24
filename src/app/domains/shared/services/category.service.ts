import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Category } from '@shared/models/Category.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private http = inject(HttpClient);
  private baseUrl = 'https://fakestoreapi.com/products/categories';

  constructor() {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl);
  }
}
