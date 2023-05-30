import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Basket } from '../sale-bar/basket';
import { SellingItem } from '../sale-bar/selling-item';
import { DiscountReason } from './discount-reason/discount-reason';
import { DiscountType } from './discount-type/discount-type';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  constructor() { }

  isBasketDiscount: boolean;

  public basketItemDiscountReasonSource = new BehaviorSubject<DiscountReason>(null);
  discountReason = this.basketItemDiscountReasonSource.asObservable();

  public basketItemDiscountTypeSource = new BehaviorSubject<DiscountType>(null);
  discountType = this.basketItemDiscountTypeSource.asObservable();

  public basketItemDiscountWorthSource = new BehaviorSubject<number>(null);
  discountWorth = this.basketItemDiscountWorthSource.asObservable();

  public basketItemSource = new BehaviorSubject<SellingItem>(null);
  selectItem = this.basketItemSource.asObservable();

  public basketSource = new BehaviorSubject<Basket>(null);
  currentBasket = this.basketSource.asObservable();

}
