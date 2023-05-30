import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { DatePipe } from '@angular/common';
import { SellingItem } from './selling-item';
import { ProductService } from '../product.service';
import { Basket } from './basket';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  basketItems: SellingItem[];
  date = new Date();

  constructor(
    private productService: ProductService,
    private http: HttpClient,
    private datePipe: DatePipe
  ) { }

  private baseUrl = "http://localhost:8080";

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
    
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
    
      // TODO: better job of transforming error for user consumption
      //this.log(`${operation} failed: ${error.message}`);
    
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  increment(basketItem: SellingItem): Observable<SellingItem[]>{
    let newQty: number = basketItem.qty + 1;
    let newBasketItem: SellingItem = {
      qty: newQty,
      note: basketItem.note,
      total: (newQty * basketItem.product.selling_price),
      discount_id: basketItem.discount_id,
      discount_type: basketItem.discount_type,
      discount_worth: basketItem.discount_worth,
      product: basketItem.product,
      date: this.datePipe.transform(this.date,"yyyy-MM-dd")
    }
   
    this.productService.basketSource.subscribe(
      (basket) => {
        this.basketItems = basket.basketItems;
        const index: number = this.basketItems.indexOf(basketItem);
        this.basketItems[index] = newBasketItem;
      }
    )
    return of(this.basketItems);
  }

  netTotal(basketItems : SellingItem[]): Observable<number>{
    let total: number = 0;
    for(let basketItem of basketItems){
      total+=basketItem.total;
    }
    return of(total);
  }

  decrement(basketItem: SellingItem): Observable<SellingItem[]>{
    let newQty: number = basketItem.qty - 1;
    let newBasketItem: SellingItem;
    if(basketItem.qty > 1){
      newBasketItem = {
        qty: newQty,
        note: basketItem.note,
        total: newQty * basketItem.product.selling_price,
        discount_id: basketItem.discount_id,
        discount_type: basketItem.discount_type,
        discount_worth: basketItem.discount_worth,
        product: basketItem.product,
        date: this.datePipe.transform(this.date,"yyyy-MM-dd")
      }
    }else{
      newBasketItem = basketItem;
    }
   
    this.productService.basketSource.subscribe(
      (basket) => {
        this.basketItems = basket.basketItems;
        const index: number = this.basketItems.indexOf(basketItem);
        this.basketItems[index] = newBasketItem;
      }
    )
    return of(this.basketItems);
  }

  submitTransaction(basket: Basket): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/api/v1/basket`, basket, this.httpOptions).pipe( 
      //tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<any>('submitTransaction'))
    );
  }

  holdTransaction(basket: Basket): Observable<Basket>{
    return this.http.post<Basket>(`${this.baseUrl}/api/v1/basket`, basket, this.httpOptions).pipe( 
      //tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Basket>('holdTransaction'))
    );
  }

}
