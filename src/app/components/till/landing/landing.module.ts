import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { BackgroundComponent } from './background/background.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [BackgroundComponent, LoginComponent],
  imports: [
    CommonModule,
    LandingRoutingModule
  ]
})
export class LandingModule { }
