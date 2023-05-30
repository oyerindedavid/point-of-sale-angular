import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationComponent } from './authentication/authentication.component';
import { SharedModule } from './shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PrintLayoutComponent } from './components/print-layout/print-layout.component';
import { SaleReceiptComponent } from './components/print-layout/sale-receipt/sale-receipt.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './authentication/login/login.component';

import { HttpClientModule, HttpClient  } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { TillEndModule } from './components/till/till-end/till-end.module';
import { TillSellingModule } from './components/till/till-selling/till-selling.module';
import { LandingModule } from './components/till/landing/landing.module';

@NgModule({
  declarations: [
    LoginComponent,
    AppComponent,
    AuthenticationComponent,
    PrintLayoutComponent,
    SaleReceiptComponent,
    PageNotFoundComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule,
    RouterModule,
    SharedModule,
    CarouselModule,
    TillEndModule,
    TillSellingModule,
    LandingModule,
    
  ],
  providers: [HttpClientModule, DatePipe],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
