import { Component, OnInit } from '@angular/core';

import { BaseComponent } from '@app/class/base.component';
import { AuthService, LayoutService } from '@app/service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent extends BaseComponent {
  constructor(
    private layoutService: LayoutService,
    private authService: AuthService,
  ) {
    super();
  }

  logout() {
    this.authService.setToken(null);
    this.layoutService.navigate(['signin']);
  }
}
