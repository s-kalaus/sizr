import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Location } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { RouterModule } from '@angular/router';
import { BsDropdownModule } from 'ngx-bootstrap';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { StoreModule } from '@ngrx/store';

import { commonReducer } from './reducer/common.reducer';
import { auctionReducer } from './reducer/auction.reducer';
import { productReducer } from './reducer/product.reducer';
import { routes } from '@app/data/routes';
import { GraphQLModule } from './graphql.module';
import { AppComponent } from '@app/component/app.component';
import { NavComponent } from '@app/component/nav.component';
import { LoaderComponent } from '@app/component/loader.component';
import { ErrorComponent } from '@app/component/error.component';
import { DashboardComponent } from '@app/component/dashboard/dashboard.component';
import { SubscriptionComponent } from '@app/component/subscription/subscription.component';
import { BotComponent } from '@app/component/bot/bot.component';
import { AuctionComponent } from '@app/component/auction/auction.component';
import { AuctionListComponent } from '@app/component/auction/list.component';
import { AuctionAddComponent } from '@app/component/auction/add.component';
import { AuctionEditComponent } from '@app/component/auction/edit.component';
import { AuctionFormComponent } from '@app/component/auction/form.component';
import { AuctionShowComponent } from '@app/component/auction/show.component';
import { AuctionProductComponent } from '@app/component/auction/product.component';
import { AuctionRemoveComponent } from '@app/component/auction/remove.component';
import { ProductListComponent } from '@app/component/product/list.component';
import { ProductAddComponent } from '@app/component/product/add.component';
import { SignupComponent } from '@app/component/signup.component';
import { SigninComponent } from '@app/component/signin.component';
import { HeaderComponent } from '@app/component/header.component';
import { ProductRemoveComponent } from '@app/component/product/remove.component';
import { ProductShowComponent } from '@app/component/product/show.component';

export function createTranslateLoader(http: HttpClient) {

  return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}

export function tokenGetter() {
  return null;
}

@NgModule({
  declarations: [
    ErrorComponent,
    AppComponent,
    NavComponent,
    HeaderComponent,
    LoaderComponent,
    DashboardComponent,
    AuctionComponent,
    AuctionListComponent,
    AuctionFormComponent,
    AuctionAddComponent,
    AuctionEditComponent,
    AuctionProductComponent,
    AuctionShowComponent,
    AuctionRemoveComponent,
    ProductListComponent,
    ProductAddComponent,
    ProductRemoveComponent,
    ProductShowComponent,
    BotComponent,
    SubscriptionComponent,
    SignupComponent,
    SigninComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    GraphQLModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [
          HttpClient,
          Location,
        ],
      },
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter,
      },
    }),
    RouterModule.forRoot(routes),
    BsDropdownModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({
      common: commonReducer,
      auction: auctionReducer,
      product: productReducer,
    }),
  ],
  providers: [
    CookieService,
    { provide: 'LANG', useValue: `${navigator.language || ''}`.toLowerCase() },
    { provide: 'WINDOW', useValue: window },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
