import { Injectable } from '@angular/core';
import { Product } from './models/product';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  basketChanged = new Subject<Product[]>();
  private products: Product[];

  constructor() {
    this.products = [];
   }

  getProducts() {
    return this.products;
  }

  getProduct(index: number) {
    return this.products[index];
  }

  addProduct(product: Product) {
    this.products.push(product);
    this.basketChanged.next(this.products);
  }

  deleteProduct(index: number) {
    this.products.splice(index, 1);
    this.basketChanged.next(this.products);
  }
}
