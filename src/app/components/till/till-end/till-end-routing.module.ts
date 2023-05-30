import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SelectCustomerComponent } from '../till-selling/customer/select-customer/select-customer.component';
import { MainSellingComponent } from '../till-selling/main-selling/main-selling.component';
import { DeviceGuard } from './device.guard';
import { MainComponent } from './main/main.component';
import { SelectDeviceComponent } from './select-device/select-device.component';
import { SelectLocationComponent } from './select-location/select-location.component';
import { SigninGuard } from './signin.guard';
import { TillSigninComponent } from './till-signin/till-signin.component';
import { CompletedComponent } from './transactions/completed/completed.component';
import { HeldComponent } from './transactions/held/held.component';
import { TransactionsComponent } from './transactions/transactions.component';

const routes: Routes = [
  {
    path: '', 
    component: MainComponent, 
    canActivate : [DeviceGuard],
    children: [
      {
        path: '',
        canActivate: [SigninGuard],
        children: [
          {
            path: 'transactions',
            component: TransactionsComponent,
            children: [
                {
                path: 'completed',
                component: CompletedComponent
                },
                {
                  path: 'held',
                  component: HeldComponent
                }
            ]
          },
          {
            path: 'select-customers',
            component: SelectCustomerComponent,
          },
          
        ]
      }, 
      {
        path: 'signin',
        component: TillSigninComponent,
      },
      
      
    ]
  },
  {
    path: 'location',
    component: SelectLocationComponent,
  },
  {
    path: 'devices/:id',
    component: SelectDeviceComponent
  },
  {
    path: 'index',
    canActivate: [SigninGuard],
    component: MainSellingComponent,
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TillEndRoutingModule { }
