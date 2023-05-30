import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
import { ProductService } from '../../product.service';
import { Basket } from '../../sale-bar/basket';
import { SellingItem } from '../../sale-bar/selling-item';
import { DiscountService } from '../discount.service';

@Component({
  selector: 'app-discount-form',
  templateUrl: './discount-form.component.html',
  styleUrls: ['./discount-form.component.scss']
})
export class DiscountFormComponent implements OnInit {

  discount = new FormControl('');
  discount_id: number;
  discount_type: number;
  basketItem: SellingItem;
  basket: Basket;
  
  constructor(
    private ds: DiscountService,
    private router: Router,
    private _location: Location,
    private ps: ProductService
  ) { }

  ngOnInit(): void {
    
  }

  applyBasketItemDiscount(){
    this.ds.basketItemDiscountWorthSource.next(this.discount.value); //Set discount worth

    this.ds.discountReason.subscribe(
      response => this.discount_id = response.id  //Set discount id
    );
    this.ds.discountType.subscribe(
      response => this.discount_type = response.id  //Set discount type
    );

    if(this.ds.isBasketDiscount == true){
      this.ds.currentBasket.subscribe(
        response => this.basket = response
      );
      this.basket.discount_id = this.discount_id;
      this.basket.discount_type = this.discount_type;
      this.basket.discount_worth = this.discount.value
      this.ps.applyBasketDiscount(this.basket);
    }else{
      this.ds.selectItem.subscribe(
        response => this.basketItem = response   //Set discount 
      );
      this.basketItem.discount_id = this.discount_id;
      this.basketItem.discount_type = this.discount_type;
      this.basketItem.discount_worth = this.discount.value;
      this.ps.applyBasketItemDiscount(this.basketItem);
    }
    
    

    
    
    

    this.router.navigate(['/till/product-list']);
  }

  backClicked() {
    this._location.back();
  }


}
