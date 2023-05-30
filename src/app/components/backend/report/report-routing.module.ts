import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SaleByProductComponent } from './sale-by-product/sale-by-product.component';
import { SaleByTimeIntervalComponent } from './sale-by-time-interval/sale-by-time-interval.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: 'sales-by-time-interval', component: SaleByTimeIntervalComponent},
      {path: 'sales-by-product', component: SaleByProductComponent},
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
