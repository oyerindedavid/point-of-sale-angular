import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../till-selling/product.service';
import { Held } from '../../till-selling/sale-bar/held';
import {Location} from '@angular/common';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

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
