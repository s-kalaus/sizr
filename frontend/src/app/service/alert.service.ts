import { Injectable } from '@angular/core';
import * as Noty from 'noty';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(
    public translateService: TranslateService,
  ) {
    Noty.overrideDefaults({
      theme: 'bootstrap-v4',
      timeout: 2000,
      layout: 'topRight',
      closeWith: [
        'click',
        'button',
      ],
    });
  }

  public show(options: any) {
    const data = Object.assign({}, options);

    if (!data.type) {
      data.type = 'error';
    }

    if (data.text) {
      data.text = this.translateService.instant(data.text);
    }

    if (data.title) {
      data.title = this.translateService.instant(data.title);
    }

    new Noty(data).show();
  }
}
