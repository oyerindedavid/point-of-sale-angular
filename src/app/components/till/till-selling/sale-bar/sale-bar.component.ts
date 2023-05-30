import { Component, OnInit } from '@angular/core';
declare var $: any;
import { DatePipe } from '@angular/common';

import { SaleService } from './sale.service';
import { SellingItem } from './selling-item';
import { Held } from './held';
import { Basket } from './basket';
import { DiscountService } from '../discount/discount.service';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { AccountService } from '../../../backend/account.service';
import { AuthService } from 'src/app/authentication/auth.service';
import { PrintService } from '../../../print-layout/print.service';

@Component({
  selector: 'app-sale-bar',
  templateUrl: './sale-bar.component.html',
  styleUrls: ['./sale-bar.component.scss'],
})

export class SaleBarComponent implements OnInit {
  date = new Date();

  constructor(
    private productService: ProductService,
    private saleService: SaleService,
    private ds: DiscountService,
    private router: Router,
    private acs: AccountService,
    private authService: AuthService,
    private datePipe: DatePipe,
    private printService: PrintService
  ) { }

  device  =  JSON.parse(localStorage.getItem('device'))

  basket : Basket = {
    staff: this.authService.staff,
    customer: null,
    is_completed: 1,
    sub_total: 0,
    discount_id: 0,
    discount_type: 0,
    discount_worth: 0,
    account_id : this.acs.getCurrentUser().account_id,
    device_id : this.device.id,
    date: this.datePipe.transform(this.date,"yyyy-MM-dd"),
    basketItems: []
  };

  emptyBasket : Basket = {
    staff: this.authService.staff,
    customer: null,
    is_completed: 1,
    sub_total: 0,
    discount_id: 0,
    discount_type: 0,
    discount_worth: 0,
    account_id : this.acs.getCurrentUser().account_id,
    device_id : this.device.id,
    date: this.datePipe.transform(this.date,"yyyy-MM-dd"),
    basketItems: []
  };

  basketItems: SellingItem[];
  selectedBasketItem: SellingItem;
  subtotal: number = 0;
  discountTotal: number = 0.00;
  tenPercentLoyalty: number;
  sub_total: number;
  qty: number = 1;

  //For basket discount
  discount_id: number = 0;
  discountType: number = 0;
  discountWorth: number = 0;

  ngOnInit(): void {
    this.getBasket();  
  }

  addToHeld(): void{
    let toHoldBasket: Held = {
       staff_id: this.authService.staff.id,
       sub_total: this.basket.sub_total,
       basket: this.basket
    }
    this.productService.addToHeld(toHoldBasket);
    this.clearBasket();
  }

  getBasket(){
    this.productService.getBasket();
    this.productService.basketSource.subscribe(
      (basket) => {
        this.getSubTotal();
        this.getTotal();
        this.getDiscountTotal();
        this.basket = basket;
      }
    );
    console.log(this.basket);
  }

  getTotal(): void{
    this.productService.currentTotal.subscribe(
      total  => this.basket.sub_total = total
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

  removeProduct(basketItem: SellingItem): void{
     this.productService.removeAProduct(basketItem).subscribe(
       (response) => this.basket = response
     );
  }

  clearBasket(): void{
    this.productService.clear().subscribe(
      (basket) => {
        this.productService.basketSource.next(basket);
      }
    );
    this.productService.totalSource.next(0);
    this.productService.subtotalSource.next(0);
  }

  increase(basketItem: SellingItem): void{
    basketItem.discount_id = 0;
    basketItem.discount_type = 0;
    basketItem.discount_worth = 0;
    this.saleService.increment(basketItem).subscribe(
      (basketItems) => {
        this.saleService.netTotal(basketItems).subscribe(
          (total) => {
            //Update total
            //this.basket.sub_total = total;   May not be necessary
            this.productService.subtotalSource.next(total);
            this.productService.totalSource.next(total);
            //Recalculate basket discount if basket discount already set
            if(this.basket.discount_id != 0){
              this.productService.applyBasketDiscount(this.basket);
            }
          }
        )
      }
    );
  }

  decrease(basketItem: SellingItem): void{
    basketItem.discount_id = 0;
    basketItem.discount_type = 0;
    basketItem.discount_worth = 0;
    this.saleService.decrement(basketItem).subscribe(
      (basketItems) => {
        this.saleService.netTotal(basketItems).subscribe(
          (total) => {
            //Update total
            this.productService.subtotalSource.next(total);
            this.productService.totalSource.next(total);
            //Recalculate basket discount if basket discount already set
            if(this.basket.discount_id != 0){
              this.productService.applyBasketDiscount(this.basket);
            }
          }
        )
      }
    );
  }

  completeTransaction(){
    this.basket.staff = this.authService.staff;
    console.log(this.basket)
    this.saleService.submitTransaction(this.basket).subscribe(
      (response) => {
        if(response.status == 'success'){
          //Perform a print operation
          this.printService.printDocument('sale-receipt', ['2'])
        }
      }
    )
    this.basket = this.emptyBasket
    this.productService.basketSource.next(this.emptyBasket)
    this.productService.subtotalSource.next(0);
    this.productService.totalSource.next(0);

  }

  holdTransactions(){
    this.basket.is_completed = 0;
    this.basket.staff = this.authService.staff;
    this.saleService.holdTransaction(this.basket).subscribe(
      (response) => {
        console.log(response)
      }
    )
    this.basket = this.emptyBasket
    this.productService.basketSource.next(this.emptyBasket)
    this.productService.subtotalSource.next(0);
    this.productService.totalSource.next(0);
  }

  addBasketItemNote(basketItem: SellingItem): void{
    this.selectedBasketItem = basketItem;
    $('#addNote').modal('show');
  }

  addBasketItemDiscount(basketItem: SellingItem){
    this.ds.basketItemSource.next(basketItem);
    this.ds.isBasketDiscount = false;
    this.router.navigate(['/till/discount-reason']);
  }

  addBasketDiscount(basket: Basket){
    this.ds.basketSource.next(basket);
    this.ds.isBasketDiscount = true;
    console.log(basket);
    this.router.navigate(['/till/discount-reason']);
  }

 

}
