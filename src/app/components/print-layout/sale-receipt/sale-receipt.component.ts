import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../till/till-selling/product.service';
import { Basket } from '../../till/till-selling/sale-bar/basket';
import { PrintService } from '../print.service';

@Component({
  selector: 'app-sale-receipt',
  templateUrl: './sale-receipt.component.html',
  styleUrls: ['./sale-receipt.component.scss']
})
export class SaleReceiptComponent implements OnInit {

  basketIds: string[];
  basket: Basket;
  subtotal;
  discountTotal

  constructor(
    route: ActivatedRoute,
    private router : Router,
    private productService : ProductService,
    private printService : PrintService
    ) {
    this.basketIds = route.snapshot.params['basketIds']
      .split(',');
  }

  ngOnInit(): void {
    console.log('Print request received')
    this.productService.basketSource.subscribe(
      (basket) => {
        this.getSubTotal();
        this.getTotal();
        this.getDiscountTotal();
        this.basket = basket;
        console.log(this.basket)
        setTimeout(() => {
          window.print()
        this.printService.isPrinting = false;
        this.router.navigate([{ outlets: { print: null }}]);
        }, 1000);
        
      }
    );
  }

  getTotal(): void{
    this.productService.currentTotal.subscribe(
      total  => this.basket.basketTotal = total
    )
  }

  getSubTotal(): void{
    this.productService.currentSubtotal.subscribe(
      total  => this.subtotal = total
    )
  }

  getDiscountTotal(): void{
    this.productService.currentDiscountTotal.subscribe(
      total  => this.discountTotal = total
    )
  }

}
