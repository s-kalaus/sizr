import { Component, HostBinding, OnInit } from '@angular/core';

import { BaseComponent } from '@app/class/base.component';
import { AuthService, LayoutService } from '@app/service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends BaseComponent {
  isFullHeight = true;

  constructor(
    public authService: AuthService,
    public layoutService: LayoutService,
  ) {
    super();
  }
}
