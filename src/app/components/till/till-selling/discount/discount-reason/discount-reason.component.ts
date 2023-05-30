import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
import { DiscountService } from '../discount.service';
import { DiscountReason } from './discount-reason';
import { DISCOUNTREASON } from './mock-discount-reasons';

@Component({
  selector: 'app-discount-reason',
  templateUrl: './discount-reason.component.html',
  styleUrls: ['./discount-reason.component.scss']
})
export class DiscountReasonComponent implements OnInit {

  discountReasons : DiscountReason[] = DISCOUNTREASON;

  constructor(
    private ds: DiscountService,
    private router: Router,
    private _location: Location,
  ) { }

  ngOnInit(): void {
  }

  addReason(reason: DiscountReason){
    this.ds.basketItemDiscountReasonSource.next(reason);
    this.router.navigate(['/till/discount-type']);
  }

  backClicked() {
    this._location.back();
  }

}
