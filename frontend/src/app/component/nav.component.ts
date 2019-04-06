import { Component, OnInit } from '@angular/core';

import { BaseComponent } from '@app/class/base.component';
import { LayoutService } from '@app/service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent extends BaseComponent {
  constructor(
    private layoutService: LayoutService,
  ) {
    super();
  }
  navs = [
    {
      title: 'nav.dashboard',
      url: [this.layoutService.path, 'dashboard'],
    },
    {
      title: 'nav.auction',
      url: [this.layoutService.path, 'auction'],
    },
    {
      title: 'nav.bot',
      url: [this.layoutService.path, 'bot'],
    },
    {
      title: 'nav.subscription',
      url: [this.layoutService.path, 'subscription'],
    },
  ];
}
