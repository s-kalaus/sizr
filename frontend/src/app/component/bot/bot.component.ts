import { Component } from '@angular/core';

import { CustomerService } from '@app/service';
import { BaseComponent } from '@app/class/base.component';

@Component({
  selector: 'app-bot',
  templateUrl: './bot.component.html',
  styleUrls: ['./bot.component.scss'],
})
export class BotComponent extends BaseComponent {
  constructor(
    private customerService: CustomerService,
  ) {
    super();
  }
}
