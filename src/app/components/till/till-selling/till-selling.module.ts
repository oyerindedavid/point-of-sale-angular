import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TillSellingRoutingModule } from './till-selling-routing.module';
import { ProductListingComponent } from './product-listing/product-listing.component';
import { SaleBarComponent } from './sale-bar/sale-bar.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { DiscountFormComponent } from './discount/discount-form/discount-form.component';
import { DiscountReasonComponent } from './discount/discount-reason/discount-reason.component';
import { DiscountTypeComponent } from './discount/discount-type/discount-type.component';
import { SelectCustomerComponent } from './customer/select-customer/select-customer.component';
import { MainSellingComponent } from './main-selling/main-selling.component';
import { NoteFormComponent } from './sale-bar/note-form/note-form.component';
import { ProductDetailComponent } from './product-listing/product-detail/product-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SaleBarComponent,
    TopBarComponent,
    SideBarComponent,
    ProductListingComponent,
    ProductDetailComponent,
    MainSellingComponent,
    NoteFormComponent,
    DiscountReasonComponent,
    DiscountTypeComponent,
    DiscountFormComponent,
    SelectCustomerComponent,
  ],
  imports: [
    CommonModule,
    TillSellingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class TillSellingModule { }
