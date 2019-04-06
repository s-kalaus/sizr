import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, of } from 'rxjs';
import { Customer, Token } from '@app/interface';
import { Apollo } from 'apollo-angular';
import graphqlTag from 'graphql-tag';
import { JwtHelperService } from '@auth0/angular-jwt';

import { AuthService } from '@app/service/auth.service';
import { customerLogin } from '@app/mutation';
import { first, switchMap } from 'rxjs/operators';
import { LoadingService } from '@app/service/loading.service';
import { Store, select } from '@ngrx/store';
import { CustomerSet } from '@app/action/common.action';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  token$: Observable<Token | null>;
  customer$: Observable<Customer | null>;
  private customerId: string;
  private customer: Customer | null;

  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
    private apollo: Apollo,
    private jwtHelperService: JwtHelperService,
    private loadingService: LoadingService,
    private store: Store<any>,
  ) {
    this.init();
  }

  init() {
    this.token$ = this.store.pipe(select('common', 'token'));
    this.customer$ = this.store.pipe(select('common', 'customer'));
    this.token$.subscribe(token => this.setToken(token));
    this.customer$.subscribe(customer => this.customer = customer);
  }

  setToken(token: string) {
    const tokenDecoded = this.jwtHelperService.decodeToken(token);

    if (!tokenDecoded || !tokenDecoded.customerId) {
      return;
    }

    if (this.customerId === tokenDecoded.customerId) {
      return;
    }

    this.customerId = tokenDecoded.customerId;
    this.fetchProfile().subscribe();
  }

  fetchProfile() {
    const observable = this.apollo
      .query({
        query: graphqlTag`
          query{
            me{
              customerId
              firstName
              lastName
            }
          }
        `,
      })
      .pipe(
        first(),
        switchMap((result: any) => {
          const payload = {
            customer: {
              customerId: result.data.me.customerId,
              firstName: result.data.me.firstName,
              lastName: result.data.me.lastName,
            },
          };
          this.store.dispatch(new CustomerSet(payload));
          return of(result.data.me);
        }),
      );
    return this.loadingService.auto(observable);
  }

  signin({ login, password }): Observable<any> {
    const observable = this.apollo
      .mutate({
        mutation: customerLogin,
        variables: {
          login,
          password,
        },
      }).pipe(
        first(),
        switchMap((result) => {
          this.authService.setToken(result.data.customerLogin.token);
          return of(result.data.customerLogin.token);
        }),
      );
    return this.loadingService.auto(observable, 'auction-process');
  }
}
