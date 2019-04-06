import { Component, HostBinding } from '@angular/core';

import { BaseComponent } from '@app/class/base.component';
import { LoadingService } from '@app/service';

@Component({
  selector: 'app-auction-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AuctionAddComponent extends BaseComponent {
  constructor(
    public loadingService: LoadingService,
  ) {
    super();
  }
}
