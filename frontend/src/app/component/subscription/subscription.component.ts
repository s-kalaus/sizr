import { Component } from '@angular/core';

import { CustomerService } from '@app/service';
import { BaseComponent } from '@app/class/base.component';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss'],
})
export class SubscriptionComponent extends BaseComponent {
  constructor(
    private customerService: CustomerService,
  ) {
    super();
  }
}
