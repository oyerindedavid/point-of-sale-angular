import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import {catchError, map, tap } from 'rxjs/operators';
import { Basket } from '../till/till-selling/sale-bar/basket';
import { BehaviorSubject } from 'rxjs';
import { Product } from './manage/product/product';
import { Category } from './manage/product/category';
import { Brand } from './manage/product/brand';
import { Tag } from './manage/product/tag';
import { Supplier } from './manage/product/supplier';

@Injectable({
  providedIn: 'root'
})

export class BProductService {

  constructor(
    private http: HttpClient,
  ) { }

  private baseUrl = "http://localhost:8080";

  public stockArraySource = new BehaviorSubject<[]>([]);
  stockArrayObs = this.stockArraySource.asObservable();

  public reviewSource = new BehaviorSubject<boolean>(false)
  reviewObs = this.reviewSource.asObservable();

  public productSource = new BehaviorSubject('');
  selectedProduct = this.productSource.asObservable();


  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      //console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      //this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      //return of(result as T);
      return throwError(error || "Server error");
    };
  }

  addProduct(product): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/api/v1/product`, product, this.httpOptions).pipe( 
      //tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      //catchError(this.handleError<any>('addProduct'))
    );
  }

  getAllProducts(): Observable<Product[]>{
    return  this.http.get<Product[]>(`${this.baseUrl}/api/v1/product`, this.httpOptions).pipe(
      //tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Product[]>('getProduct'))
    );
  }

  getSearchedProduct(keyword): Observable<Product[]>{
    return  this.http.get<Product[]>(`${this.baseUrl}/api/v1/product/search/${keyword}`, this.httpOptions).pipe(
      //tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Product[]>('getSearchedProduct'))
    );
  }

  updateProduct(productInfo, productId: number):Observable<any>{
    return this.http.put<any>(`${this.baseUrl}/api/v1/product/${productId}`, productInfo, this.httpOptions).pipe(
      //tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<any[]>('updateProduct'))
    )
  }

  deleteProduct(accountId : number, productId: number):Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}/api/v1/product/${productId}/account/${accountId}`, this.httpOptions).pipe(
      //tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<any[]>('updateProduct'))
    )
  }

  getProductById(productId: number): Observable<Product[]>{
    return  this.http.get<Product[]>(`${this.baseUrl}/api/v1/product/${productId}`, this.httpOptions).pipe(
      //tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Product[]>('getProductById'))
    );
  }

  addCategory(category): Observable<Category>{
    return this.http.post<Category>(`${this.baseUrl}/api/v1/category`, category, this.httpOptions).pipe( 
      //tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Category>('addCategory'))
    );
  }

  updateCategory(categoryInfo, categoryId: number):Observable<any>{
    return this.http.put<any>(`${this.baseUrl}/api/v1/category/${categoryId}`, categoryInfo, this.httpOptions).pipe(
      //tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<any[]>('updateCategory'))
    )
  }

  deleteCategory(accountId : number, categoryId: number):Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}/api/v1/category/${categoryId}/account/${accountId}`, this.httpOptions).pipe(
      //tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<any[]>('deleteCategory'))
    )
  }

  getCategoryById(categoryId: number): Observable<Category[]>{
    return  this.http.get<Category[]>(`${this.baseUrl}/api/v1/category/${categoryId}`, this.httpOptions).pipe(
      //tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Category[]>('getCategoryById'))
    );
  }

  getAllCategories(account_id): Observable<Category[]>{
    return  this.http.get<Category[]>(`${this.baseUrl}/api/v1/category/account/${account_id}`, this.httpOptions).pipe(
      //tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Category[]>('getCategory'))
    )
  }

  addBrand(brand): Observable<Brand>{
    return this.http.post<Brand>(`${this.baseUrl}/api/v1/brand`, brand, this.httpOptions).pipe( 
      //tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Brand>('addBrand'))
    );
  }

  getBrandById(brandId: number): Observable<Brand>{
    return  this.http.get<Brand>(`${this.baseUrl}/api/v1/brand/${brandId}`, this.httpOptions).pipe(
      //tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Brand>('getBrandById'))
    );
  }

  updateBrand(brandInfo, brandId: number):Observable<any>{
    return this.http.put<any>(`${this.baseUrl}/api/v1/brand/${brandId}`, brandInfo, this.httpOptions).pipe(
      //tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<any[]>('updateBrand'))
    )
  }

  deleteBrand(accountId : number, brandId: number):Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}/api/v1/brand/${brandId}/account/${accountId}`, this.httpOptions).pipe(
      //tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<any[]>('deleteBrand'))
    )
  }

  getAllBrand(account_id): Observable<Brand[]>{
    return  this.http.get<Brand[]>(`${this.baseUrl}/api/v1/brand/account/${account_id}`, this.httpOptions).pipe(
      //tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Brand[]>('getAllBrand'))
    )
  }

  addTag(tag): Observable<Tag>{
    return this.http.post<Tag>(`${this.baseUrl}/api/v1/tag`, tag, this.httpOptions).pipe( 
      //tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Tag>('addTag'))
    );
  }

  getAllTags(account_id): Observable<Tag[]>{
    return  this.http.get<Tag[]>(`${this.baseUrl}/api/v1/tag/account/${account_id}`, this.httpOptions).pipe(
      //tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Tag[]>('getTags'))
    )
  }

  updateTag(tagInfo, tagId: number):Observable<any>{
    return this.http.put<any>(`${this.baseUrl}/api/v1/tag/${tagId}`, tagInfo, this.httpOptions).pipe(
      //tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<any[]>('updateTag'))
    )
  }

  deleteTag(accountId : number, tagId: number):Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}/api/v1/tag/${tagId}/account/${accountId}`, this.httpOptions).pipe(
      //tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<any[]>('deleteTag'))
    )
  }

  addSupplier(supplier): Observable<Supplier>{
    return this.http.post<Supplier>(`${this.baseUrl}/api/v1/supplier`, supplier, this.httpOptions).pipe( 
      //tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Supplier>('addSuplier'))
    );
  }

  getSupplierById(supplierId: number): Observable<Supplier>{
    return  this.http.get<Supplier>(`${this.baseUrl}/api/v1/supplier/${supplierId}`, this.httpOptions).pipe(
      //tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Supplier>('getSupplierById'))
    );
  }

  getAllSuppliers(account_id): Observable<Supplier[]>{
    return  this.http.get<Supplier[]>(`${this.baseUrl}/api/v1/supplier/account/${account_id}`, this.httpOptions).pipe(
      //tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Supplier[]>('getSuppliers'))
    )
  }

  updateSupplier(supplierInfo, supplierId: number):Observable<any>{
    return this.http.put<any>(`${this.baseUrl}/api/v1/supplier/${supplierId}`, supplierInfo, this.httpOptions).pipe(
      //tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<any[]>('updateBrand'))
    )
  }

  deleteSupplier(accountId : number, supplierId: number):Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}/api/v1/supplier/${supplierId}/account/${accountId}`, this.httpOptions).pipe(
      //tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<any[]>('deleteSupplier'))
    )
  }

  getTransactionByStaffId(is_completed: boolean, user_id): Observable<Basket[]>{
    return this.http.get<Basket[]>(`${this.baseUrl}/api/v1/transactions/${is_completed}/user/${user_id}`, this.httpOptions).pipe(
      //tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Basket[]>('getTransactionByStaffId'))
    )
  }

  saveStock(stockInfo): Observable<String>{
    return this.http.post<String>(`${this.baseUrl}/api/v1/stock`, stockInfo, this.httpOptions).pipe( 
      //tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<String>('saveStock'))
    );
  }

  getStockInfo(queryData): Observable<String>{
    return this.http.post<String>(`${this.baseUrl}/api/v1/stock/info`, queryData, this.httpOptions).pipe( 
      //tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<String>('getStockInfo'))
    );
  }

  

  

}
