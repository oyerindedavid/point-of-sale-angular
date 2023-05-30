import { Component, OnInit } from '@angular/core';
import { BProductService } from '../../../backend/b-product.service';
import { Product } from '../../../backend/manage/product/product';
import { ProductService } from '../product.service';

declare var $: any;


@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss']
})
export class ProductListingComponent implements OnInit {
  products: Product[];
  selectedProduct: Product;

  constructor(
    private productService: ProductService,
    private bps: BProductService
    ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  openDetail(product: Product): void{
    $('#detailInfo').modal('show');
    this.selectedProduct = product;
  }

  getProducts(): void{
    this.bps.getAllProducts()
    .subscribe(products => this.products = products);
  }

  addToBasket(product: Product){
     this.productService.add(product);
  }

}
