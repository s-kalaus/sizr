import { Component } from '@angular/core';

import { CustomerService } from '@app/service';
import { BaseComponent } from '@app/class/base.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent extends BaseComponent {
  constructor(
    private customerService: CustomerService,
  ) {
    super();
  }
}
