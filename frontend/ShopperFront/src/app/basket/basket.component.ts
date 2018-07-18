import { Component, OnInit } from '@angular/core';
import { BasketService } from '../basket.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  products: Product[];
  totalCost: number;

  constructor(private basketService: BasketService) { }

  ngOnInit() {
    this.products = this.getProducts();
    this.basketService.basketChanged
      .subscribe(
        (products: Product[]) => {
          this.products = products;
          this.totalCost = this.calculateTotalCost();
        }
      );
    this.totalCost = this.calculateTotalCost();
  }

  getProducts() {
    return this.basketService.getProducts();
  }

  removeProduct(index: number) {
    this.basketService.deleteProduct(index);
  }

  calculateTotalCost() {
    let total = 0;
    this.products.forEach(product => {
      total += product.price;
    });
    return total;
  }
}
