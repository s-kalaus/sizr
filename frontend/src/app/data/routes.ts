import { Routes } from '@angular/router';
import { ErrorComponent } from '@app/component/error.component';
import { DashboardComponent } from '@app/component/dashboard/dashboard.component';
import { AuthRouteService } from '@app/service';
import { AuctionComponent } from '@app/component/auction/auction.component';
import { BotComponent } from '@app/component/bot/bot.component';
import { SubscriptionComponent } from '@app/component/subscription/subscription.component';
import { AuctionListComponent } from '@app/component/auction/list.component';
import { AuctionAddComponent } from '@app/component/auction/add.component';
import { AuctionEditComponent } from '@app/component/auction/edit.component';
import { AuctionShowComponent } from '@app/component/auction/show.component';
import { AuctionProductComponent } from '@app/component/auction/product.component';
import { AuctionRemoveComponent } from '@app/component/auction/remove.component';
import { SignupComponent } from '@app/component/signup.component';
import { SigninComponent } from '@app/component/signin.component';
import { ProductListComponent } from '@app/component/product/list.component';
import { ProductAddComponent } from '@app/component/product/add.component';
import { ProductRemoveComponent } from '@app/component/product/remove.component';
import { ProductShowComponent } from '@app/component/product/show.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthRouteService] },
  { path: 'auction', component: AuctionComponent, canActivate: [AuthRouteService], children: [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'list', component: AuctionListComponent },
    { path: 'add', component: AuctionAddComponent },
    { path: ':auctionId/edit', component: AuctionEditComponent },
    { path: ':auctionId/show', component: AuctionShowComponent },
    { path: ':auctionId/product', component: AuctionProductComponent, children: [
        { path: '', component: ProductListComponent },
        { path: 'add', component: ProductAddComponent },
        { path: ':productId/remove', component: ProductRemoveComponent },
        { path: ':productId/show', component: ProductShowComponent },
    ] },
    { path: ':auctionId/remove', component: AuctionRemoveComponent },
  ] },
  { path: 'bot', component: BotComponent, canActivate: [AuthRouteService] },
  { path: 'subscription', component: SubscriptionComponent, canActivate: [AuthRouteService] },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: '**', component: ErrorComponent },
];
