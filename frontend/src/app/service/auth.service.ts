import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import { LayoutService } from '@app/service/layout.service';
import { Store } from '@ngrx/store';
import { TokenSet } from '@app/action/common.action';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string = null;
  subscriptionClient: any;

  constructor(
    private jwtHelperService: JwtHelperService,
    private layoutService: LayoutService,
    private router: Router,
    private cookieService: CookieService,
    private store: Store<any>,
  ) {

    this.init();
  }

  init() {
    this.checkToken();
  }

  checkToken() {
    const token = this.cookieService.get('authorization') || null;

    if (!token || this.jwtHelperService.isTokenExpired(token)) {
      return this.authError();
    }

    const tokenDecoded = this.jwtHelperService.decodeToken(token);

    if (!tokenDecoded || !tokenDecoded.customerId) {
      return this.authError();
    }

    this.setToken(token);
  }

  setToken(token: string | null) {
    if (token) {
      this.cookieService.set('authorization', token, 0, '/');
    } else {
      this.cookieService.delete('authorization');
    }

    this.token = token;
    const payload = {
      token: this.token,
    };
    this.store.dispatch(new TokenSet(payload));
  }

  getToken() {
    return this.token;
  }

  isAuthenticated() {
    return !!this.getToken();
  }

  authError() {
    this.token = null;
    const payload = {
      token: this.token,
    };
    this.store.dispatch(new TokenSet(payload));
    const url = this.layoutService.isApp ? ['error'] : ['signin'];
    this.layoutService.navigate(url);
  }
}
