import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninGuard } from '../till-end/signin.guard';
import { DiscountFormComponent } from './discount/discount-form/discount-form.component';
import { DiscountReasonComponent } from './discount/discount-reason/discount-reason.component';
import { DiscountTypeComponent } from './discount/discount-type/discount-type.component';
import { MainSellingComponent } from './main-selling/main-selling.component';


import { ProductListingComponent } from './product-listing/product-listing.component';

const routes: Routes = [
  { 
    path: '', 
    canActivate: [SigninGuard],
    component: MainSellingComponent, 
    children : [ 
      {path: 'product-list', component: ProductListingComponent},
      {path: 'discount-reason', component: DiscountReasonComponent},
      {path: 'discount-type', component: DiscountTypeComponent},
      {path: 'discount-form', component: DiscountFormComponent},
    ]
 },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TillSellingRoutingModule { }
