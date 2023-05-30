import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit {

  customerForm: FormGroup;
  message = null;
  constructor(
    private fb : FormBuilder,
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(){
    this.customerForm = this.fb.group({
      firstname: [''],
      lastname: [''],
      phone: [''],
      email: [''],
      address: [''],
      user_id: 1,
    })
  }

  addCustomer(): void{
    this.customerService.addCustomer(this.customerForm.value).subscribe(
      response => this.message = response
    );
  }

}
