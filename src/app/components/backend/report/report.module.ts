import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { SaleByProductComponent } from './sale-by-product/sale-by-product.component';
import { SaleByTimeIntervalComponent } from './sale-by-time-interval/sale-by-time-interval.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { DpDatePickerModule } from 'ng2-date-picker';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';


@NgModule({
  declarations: [
    SaleByProductComponent,
    SaleByTimeIntervalComponent
  ],
  imports: [
    CommonModule,
    ReportRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule,
    NgSelectModule,
    DpDatePickerModule,
    NgxDaterangepickerMd.forRoot(),
  ]
})
export class ReportModule { }
