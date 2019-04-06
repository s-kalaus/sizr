import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '@app/service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthRouteService implements CanActivate {
  constructor(
    private authService: AuthService,
  ) {
  }

  canActivate() {
    return this.authService.isAuthenticated();
  }
}
