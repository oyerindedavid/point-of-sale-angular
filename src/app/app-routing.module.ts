import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { DiscountFormComponent } from './components/till/till-selling/discount/discount-form/discount-form.component';
import { DiscountReasonComponent } from './components/till/till-selling/discount/discount-reason/discount-reason.component';
import { DiscountTypeComponent } from './components/till/till-selling/discount/discount-type/discount-type.component';
import { MainSellingComponent } from './components/till/till-selling/main-selling/main-selling.component';
import { ProductListingComponent } from './components/till/till-selling/product-listing/product-listing.component';

import { HoriFullLayoutComponent } from './shared/layouts-horizontal/hori-full-layout/hori-full-layout.component';
import { ContentLayoutComponent } from './shared/layouts/content-layout/content-layout.component';
import { ErrorLayoutComponent } from './shared/layouts/error-layout/error-layout.component';
import { FullLayoutComponent } from './shared/layouts/full-layout/full-layout.component';
import { MessageLayoutComponent } from './shared/layouts/message-layout/message-layout.component';
import { Content_Routes,  Message_Routes } from './shared/routes/content.routes';
import {  Full_Content_Routes } from './shared/routes/full-content.routes';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  
  //{ path: 'login', component: LoginComponent },
  { path: '', component: FullLayoutComponent, children: Full_Content_Routes },
  // { path: '', component: HoriFullLayoutComponent, children: Full_Content_Routes },
  { path: '', component: ContentLayoutComponent, children: Content_Routes },
  { path: '', component: MessageLayoutComponent, children: Message_Routes },
  // { path: '', component: ErrorLayoutComponent, children: Error_Routes },

  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [[RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled',
    scrollPositionRestoration: 'enabled',
    relativeLinkResolution: 'legacy'
  })],
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
