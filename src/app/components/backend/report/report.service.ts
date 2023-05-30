import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(
    private http: HttpClient,
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

  getSales(filter): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/api/v1/sales`, filter, this.httpOptions).pipe(
      //tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<any>('getSales'))
    )
  }

  getSalesByProduct(filter): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/api/v1/sales/product`, filter, this.httpOptions).pipe(
      //tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<any>('getSalesByProduct'))
    )
  }

  getProductSellingRate(filter): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/api/v1/sales/rate`, filter, this.httpOptions).pipe(
      //tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<any>('getProductSellingRate'))
    )
  }

  getSalesByCategory(filter): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/api/v1/sales/category`, filter, this.httpOptions).pipe(
      //tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<any>('getSalesByCategory'))
    )
  }

  getSalesByTimeInterval(filter): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/api/v1/sales/time-interval`, filter, this.httpOptions).pipe(
      //tap((newHero: Hero) => this.log(`add ed hero w/ id=${newHero.id}`)),
      catchError(this.handleError<any>('getSalesByTimeInterval'))
    )
  }

  getProductSaleByTime(date): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/api/v1/sales/${date}`, this.httpOptions).pipe(
      //tap((newHero: Hero) => this.log(`add ed hero w/ id=${newHero.id}`)),
      catchError(this.handleError<any>('getProductSaleByTime'))
    )
  }

  getSalesByEmployee(filter): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/api/v1/sales/employee`, filter, this.httpOptions).pipe(
      //tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<any>('getSalesByEmployee'))
    )
  }
  
}
