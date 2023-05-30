import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/components/till/till-selling/product.service';
import { Held } from 'src/app/components/till/till-selling/sale-bar/held';
import {Location} from '@angular/common';

@Component({
  selector: 'app-held',
  templateUrl: './held.component.html',
  styleUrls: ['./held.component.scss']
})
export class HeldComponent implements OnInit {

  heldTransactions: Held[];
  
  constructor(
    private productService: ProductService,
    private _location: Location,
  ) { }

  ngOnInit(): void {
    this.productService.currentHeldBaskets.subscribe(
      (heldBaskets) => {
        this.heldTransactions = heldBaskets;
        console.log(this.heldTransactions[0].basket.basketItems[0].product);
       }
    )
 }

 backClicked() {
   this._location.back();
 }

}
