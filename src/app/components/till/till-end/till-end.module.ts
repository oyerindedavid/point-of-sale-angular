import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TillEndRoutingModule } from './till-end-routing.module';

import { MainComponent } from './main/main.component';
import { SelectDeviceComponent } from './select-device/select-device.component';
import { SelectLocationComponent } from './select-location/select-location.component';
import { TillSigninComponent } from './till-signin/till-signin.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { CompletedComponent } from './transactions/completed/completed.component';
import { HeldComponent } from './transactions/held/held.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MainComponent, 
    SelectDeviceComponent, SelectLocationComponent, TillSigninComponent, 
    TopBarComponent, TransactionsComponent, CompletedComponent, HeldComponent],
  imports: [
    CommonModule,
    TillEndRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class TillEndModule { }
