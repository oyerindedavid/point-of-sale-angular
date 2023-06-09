import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BackgroundComponent } from './background/background.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '', 
    component: BackgroundComponent, 
    children: [
      {
        path: 'login',
        component: LoginComponent
      }
    ]
  }
 ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule { }
