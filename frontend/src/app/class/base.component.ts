import { OnInit, OnDestroy, HostBinding } from '@angular/core';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Subscription } from 'rxjs';

@AutoUnsubscribe()
export class BaseComponent implements OnInit, OnDestroy {
  @HostBinding('class.t-fullheight') protected isFullHeight: boolean = false;
  protected subscriptions: Subscription[] = [];

  ngOnInit() {
    this.init();
  }

  ngOnDestroy() {
    this.destroy();
  }

  init() {
  }

  destroy() {
  }
}
