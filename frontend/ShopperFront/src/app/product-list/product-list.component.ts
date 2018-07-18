import { Component, OnInit } from '@angular/core';

import { ProductService } from '../product.service';
import { Product } from '../models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: Product[];

  constructor(private productService: ProductService,
              private router: Router) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getListofProducts()
    .subscribe( prod => this.products = prod);
  }

  goToDetails(product) {
    this.router.navigate(['/product', product._id]);
  }

}
