import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
import { Customer } from 'src/app/components/backend/manage/customer/customer';
import { ProductService } from '../../product.service';
import { CustomerService } from 'src/app/components/backend/manage/customer/customer.service';

@Component({
  selector: 'app-select-customer',
  templateUrl: './select-customer.component.html',
  styleUrls: ['./select-customer.component.scss']
})
export class SelectCustomerComponent implements OnInit {

  customers: Customer[];

  constructor(
    private _location: Location,
    private customerService: CustomerService,
    private productService: ProductService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getCustomers();
  }

  backClicked() {
    this._location.back();
  }

  getCustomers():void{
    this.customerService.getAllCustomer().subscribe(
      (response) => {
        this.customers = response;
       }
   )
  }

  selectCustomer(customer){
    this.productService.selectCustomer(customer);
    this.router.navigate(['/till/product-list']);
  }


}
