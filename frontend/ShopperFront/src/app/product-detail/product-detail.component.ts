import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { Product } from '../models/product';
import { ProductService } from '../product.service';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BasketService } from '../basket.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  product: Product;

  constructor(private productService: ProductService,
              private basketService: BasketService,
              private route: ActivatedRoute,
              private router: Router,
              public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getProduct();
  }

  getProduct() {
    const id = this.route.snapshot.paramMap.get('id');
    return this.productService.getProductById(id)
      .subscribe( prod => this.product = prod);
  }

  addToCart() {
    this.basketService.addProduct(this.product);
    this.openSnackBar('Product added to cart', 'Close');
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, { duration: 2000 });
  }

}
