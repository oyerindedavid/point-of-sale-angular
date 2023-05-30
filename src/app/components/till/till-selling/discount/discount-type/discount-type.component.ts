import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
import { DiscountService } from '../discount.service';
import { DiscountType } from './discount-type';
import { DISCOUNTTYPE } from './mock-discount-type';

@Component({
  selector: 'app-discount-type',
  templateUrl: './discount-type.component.html',
  styleUrls: ['./discount-type.component.scss']
})
export class DiscountTypeComponent implements OnInit {

  discountTypes: DiscountType[] = DISCOUNTTYPE;
  discount_id: number;
  constructor(
    private ds: DiscountService,
    private router: Router,
    private _location: Location,
  ) { }

  ngOnInit(): void {
    
  }

  addReason(selectedDiscountType: DiscountType){
    this.ds.basketItemDiscountTypeSource.next(selectedDiscountType);
    this.router.navigate(['/till/discount-form']);
  }

  backClicked() {
    this._location.back();
  }

}
