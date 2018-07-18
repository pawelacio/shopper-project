import { Injectable, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Product } from './models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getListofProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:3000/products');
  }

  getProductById(id) {
    return this.http.get<Product>('http://localhost:3000/products/' + id);
  }
}
