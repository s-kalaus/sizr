import { Inject, Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { AlertService } from '@app/service/alert.service';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  path = '/';
  private langDefault = 'en';
  private langAvailable: string[] = ['en'];
  public isApp = false;

  constructor(
    @Inject('WINDOW') private window: any,
    @Inject('LANG') private lang: any,
    private translateService: TranslateService,
    private router: Router,
    protected alertService: AlertService,
  ) {
    this.init();
  }

  init() {
    this.isApp = this.window.top !== this.window;
    this.translateService.setDefaultLang('en');
    this.translateService
      .use(this.langAvailable.indexOf(this.lang) === -1 ? this.langDefault : this.lang);
  }

  navigate(url: string[] = []) {
    this.router.navigate([this.path, ...url]);
  }

  processApiError(err: any) {
    this.alertService.show({ text: err.message });
    return throwError(err);
  }
}
