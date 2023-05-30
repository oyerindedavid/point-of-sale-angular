import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {catchError, tap } from 'rxjs/operators';
import { Customer } from './customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

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

  addCustomer(customer : Customer): Observable<Customer>{
    return this.http.post<Customer>(`${this.baseUrl}/api/v1/customer`, customer, this.httpOptions).pipe( 
      //tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Customer>('addCustomer'))
    );
  }

  getAllCustomer(): Observable<Customer[]>{
    return this.http.get<Customer[]>(`${this.baseUrl}/api/v1/customer`, this.httpOptions).pipe( 
      //tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Customer[]>('viewAllCustomer'))
    );
  }

  getCustomerById(customer_id: number): Observable<Customer>{
    return this.http.get<Customer>(`${this.baseUrl}/api/v1/customer/${customer_id}`, this.httpOptions).pipe( 
      //tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Customer>('viewACustomer'))
    );
  }

  updateCustomerById(customer): Observable<Customer>{
    return this.http.put<Customer>(`${this.baseUrl}/api/v1/customer/`, customer, this.httpOptions).pipe( 
      //tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Customer>('updateCustomer'))
    );
  }

  deleteCustomerById(customer_id: number): Observable<Customer>{
    return this.http.delete<Customer>(`${this.baseUrl}/api/v1/customer/${customer_id}`, this.httpOptions).pipe( 
      //tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Customer>('deleteCustomer'))
    );
  }

}
