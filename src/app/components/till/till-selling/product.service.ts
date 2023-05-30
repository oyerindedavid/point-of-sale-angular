import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { DatePipe } from '@angular/common';
import { Basket } from './sale-bar/basket';
import { SellingItem } from './sale-bar/selling-item';
import { Held } from './sale-bar/held';
import { Product } from '../../backend/manage/product/product';
import { Customer } from '../../backend/manage/customer/customer';
import { AuthService } from 'src/app/authentication/auth.service';
import { AccountService } from '../../backend/account.service';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  date = new Date();
  device  =  JSON.parse(localStorage.getItem('device'))
  constructor(
    private authService: AuthService,
    private datePipe: DatePipe,
    private acs : AccountService
  ) {}

  basket : Basket  =  {
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

  basketItems : SellingItem[] = [];
  sub_total: number;

  heldBaskets: Held[] = [];
  heldBasket: Held;

  discountTotal: number;

  public totalSource = new BehaviorSubject(0);
  currentTotal = this.totalSource.asObservable();

  public subtotalSource = new BehaviorSubject(0);
  currentSubtotal = this.subtotalSource.asObservable();

  public discountTotalSource = new BehaviorSubject(0);
  currentDiscountTotal = this.discountTotalSource.asObservable();

  public basketSource = new BehaviorSubject<Basket>(null);
  currentBasket = this.basketSource.asObservable();

  public heldBasketsSource = new BehaviorSubject<Held[]>(null);
  currentHeldBaskets = this.heldBasketsSource.asObservable();

  
  addToHeld(heldBasket: Held){
    this.heldBaskets.push(heldBasket);
    this.heldBasketsSource.next(this.heldBaskets);
  }

  /* getProducts(): Observable<any>{
    return of(PRODUCTS);
  } */

  getBasketItems(){
    this.currentBasket.subscribe(
      result => this.basketItems = result.basketItems
    )
  }

  getsub_total(basketItem: SellingItem[]): void{
    this.currentTotal.subscribe(
      total  => this.sub_total = total
    )
  }

  calculateSubTotal(basket: Basket){
    let total: number = 0;
    for(let basketItem of basket.basketItems){
      total += basketItem.product.selling_price * basketItem.qty;
    }
    this.subtotalSource.next(total);
  }

  getBasket(): void{
    this.basketSource.next(this.basket);
  }

  

  add(product: Product){
    let total: number = 0;
    let qty = 0;

    let basketItem: SellingItem = {
      qty: qty,
      total: product.selling_price,
      note: '',
      discount_id: 0,
      discount_type: 0,
      discount_worth: 0,
      product: product,
      date: this.datePipe.transform(this.date,"yyyy-MM-dd")
    }
    
    if(this.checkIfAlreadyInBasket(product.id, this.basket.basketItems) == true){
      this.basketSource.next(this.basket);
   }else{
      basketItem.qty = 1;
      this.basket.basketItems.push(basketItem);
      this.basketSource.next(this.basket);
    }
    
    for(let basketItem of this.basket.basketItems){
      total+=basketItem.total;
    }
    this.totalSource.next(total);
    this.subtotalSource.next(total);
  }

  checkIfAlreadyInBasket(productID:number, basketItems: SellingItem[]): boolean{
     let i;
     for(i = 0; i < basketItems.length; i++){
           let basketItem = this.basket.basketItems[i];
         if(basketItem.product.id === productID ){
          basketItem.qty++;
          basketItem.total = basketItem.qty * basketItem.product.selling_price;
            return true
         }
     }
     return false;
  }

  removeAProduct(basketItem: SellingItem): Observable<Basket>{
    const index: number = this.basket.basketItems.indexOf(basketItem);
   // let amountToRemove: number = this.basket.basketItems[index].total;
    
    if(index !== -1){
      this.basket.basketItems.splice(index, 1);
    }
    //Recalculate Breakdown on item removal
    this.netTotal(this.basket.basketItems).subscribe(
      total => this.totalSource.next(total)
    )
    this.calculateDiscountTotal(this.basket);
    this.calculateSubTotal(this.basket);
    this.basketSource.next(this.basket);

    return of(this.basket);
  }

  netTotal(basketItems): Observable<number>{
    let total: number = 0;
    for(let basketItem of basketItems){
      total += basketItem.total;
    }
    return of(total);
  }

  clear(): Observable<Basket>{
    return of(this.basket);
  }

  addNoteToBasketItem(note: string, selectedBasketItem: SellingItem):void{
    let i;
    for(i = 0; i < this.basketItems.length; i++){
          let basketItem = this.basketItems[i];
        if(basketItem.product.id === selectedBasketItem.product.id){
            basketItem.note = note;  //Updating selected basket item;
        }
    }
    console.log(this.basketItems);
  }

  applyBasketItemDiscount(basketItem: SellingItem){
    const index: number = this.basket.basketItems.indexOf(basketItem);
    let newItemTotal;
    switch(basketItem.discount_type){
      case 1:
        newItemTotal = basketItem.total - ((basketItem.discount_worth/100)*basketItem.total);
        break;
      case 2:
        newItemTotal = basketItem.total - basketItem.discount_worth;
        break;
      case 3:
        newItemTotal = basketItem.discount_worth;
        break;
      default:
        newItemTotal = newItemTotal;
    }
    basketItem.total = newItemTotal;
    this.basketItems[index] = basketItem;

    // Calculating new basket total
    this.netTotal(this.basket.basketItems).subscribe(
      response => this.totalSource.next(response)
    )
    this.calculateDiscountTotal(this.basket);
  }

  applyBasketDiscount(basket: Basket): void{
     let newsub_total;
     switch(this.basket.discount_type){
         case 1:
           newsub_total = basket.sub_total - ((basket.discount_worth/100)*this.basket.sub_total);
           break;
         case 2:
           newsub_total = basket.sub_total - basket.discount_worth;
           break; 
         case 3:
           newsub_total = basket.discount_worth;
           break;
         default:
           newsub_total = newsub_total;
     }
     this.discountTotalSource.next(basket.sub_total - newsub_total);
     basket.sub_total = newsub_total;
     this.basketSource.next(basket);
     this.totalSource.next(newsub_total);
     console.log(basket);
     
  }

  calculateDiscountTotal(basket: Basket){
    let discountTotal: number = 0;
    for(let basketItem of basket.basketItems){
       discountTotal += (basketItem.product.selling_price * basketItem.qty) - basketItem.total;
    }
    this.discountTotalSource.next(discountTotal);
    console.log('Discount ' + discountTotal)
  }

  selectCustomer(customer: Customer){
      this.basket.customer = customer;
      this.basketSource.next(this.basket);
      console.log(this.basket);
  }

 

}

