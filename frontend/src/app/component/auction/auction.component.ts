import { Component } from '@angular/core';

import { CustomerService } from '@app/service';
import { BaseComponent } from '@app/class/base.component';

@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.scss'],
})
export class AuctionComponent extends BaseComponent {
  constructor(
    private customerService: CustomerService,
  ) {
    super();
  }
}
