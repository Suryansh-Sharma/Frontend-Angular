import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {IssueAndReturnComponent} from "./issue-and-return/issue-and-return.component";
import {HomeComponent} from "./home/home.component";
import {AddUpdateUserComponent} from "./add-update-user/add-update-user.component";
import {GeneratePayFineComponent} from "./generate-pay-fine/generate-pay-fine.component";
import {SearchComponent} from "./search/search.component";
import {AddUpdateItemComponent} from "./add-update-item/add-update-item.component";
import {ItemFullDetailComponent} from "./item-full-detail/item-full-detail.component";
import {IssuerInfoComponent} from "./issuer-info/issuer-info.component";
import {AuthGuard} from "./service/auth/AuthGuard";
import {LoginSignupComponent} from "./login-signup/login-signup.component";
import {StaticsComponent} from "./statics/statics.component";
import {AllFinePageComponent} from "./all-fine-page/all-fine-page.component";

const routes:Routes=[
  {
    path:'security/:target',
    component:LoginSignupComponent,
  },
  {
    path:'',
    component:HomeComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'issue-item',
    component:IssueAndReturnComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'return-item',
    component:IssueAndReturnComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'add-update-issuer/:target',
    component:AddUpdateUserComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'generate-fine/:target',
    component:GeneratePayFineComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'search/:target',
    component:SearchComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'add-update-new-item/:target',
    component:AddUpdateItemComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'item-full-detail/:item_uuid',
    component:ItemFullDetailComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'issuer-info/:issuer_uid',
    component:IssuerInfoComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'show-statics',
    component:StaticsComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'all-fine',
    component:AllFinePageComponent,
    canActivate:[AuthGuard]
  }
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
