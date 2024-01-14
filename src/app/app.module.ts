import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {NavBarComponent} from './nav-bar/nav-bar.component';
import {DatePipe, NgOptimizedImage} from "@angular/common";
import {HomeComponent} from './home/home.component';
import {BorrowedItemComponent} from './borrowed-item/borrowed-item.component';
import {AddUpdateItemComponent} from './add-update-item/add-update-item.component';
import {AddUpdateUserComponent} from './add-update-user/add-update-user.component';
import {IssueAndReturnComponent} from './issue-and-return/issue-and-return.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "./app-routing.module";
import {AngularToastifyModule} from "angular-toastify";
import {GeneratePayFineComponent} from './generate-pay-fine/generate-pay-fine.component';
import {SearchComponent} from './search/search.component';
import {ItemFullDetailComponent} from './item-full-detail/item-full-detail.component';
import {IssuerInfoComponent} from './issuer-info/issuer-info.component';
import {LoginSignupComponent} from './login-signup/login-signup.component';
import { StaticsComponent } from './statics/statics.component';
import {NgApexchartsModule} from "ng-apexcharts";
import { AllFinePageComponent } from './all-fine-page/all-fine-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    BorrowedItemComponent,
    AddUpdateItemComponent,
    AddUpdateUserComponent,
    IssueAndReturnComponent,
    GeneratePayFineComponent,
    SearchComponent,
    ItemFullDetailComponent,
    IssuerInfoComponent,
    LoginSignupComponent,
    StaticsComponent,
    AllFinePageComponent
  ],
    imports: [
        BrowserModule,
        NgOptimizedImage,
        HttpClientModule,
        AppRoutingModule,
        AngularToastifyModule,
        NgApexchartsModule
    ],
  providers: [
    HttpClient,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
