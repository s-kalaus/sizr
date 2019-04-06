import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

import { LoadingEvent } from '@app/interface';
import { catchError, finalize, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  public storage: any = {};
  public loadingStateChanged$: Observable<LoadingEvent> = null;

  start(area: string = 'global', delay: number = 400) {
    this.ensureKey(area);
    this.storage[area].count += 1;

    if (this.storage[area].timer) {
      clearTimeout(this.storage[area].timer);
    }

    this.storage[area].timer = setTimeout(
      () => {
        this.storage[area].animated = true;
      },
      delay,
    );
  }

  stop(area: string = 'global') {
    this.ensureKey(area);
    this.storage[area].count -= 1;

    if (this.storage[area].count < 0) {
      this.storage[area].count = 0;
    }

    if (!this.storage[area].count && this.storage[area].timer) {
      clearTimeout(this.storage[area].timer);
      this.storage[area].animated = false;
    }
  }

  ensureKey(area: string) {
    if (typeof this.storage[area] === 'undefined') {
      this.storage[area] = {
        count: 0,
        animated: false,
        timer: null,
      };
    }
  }

  isLoading(area: string = 'global') {
    this.ensureKey(area);
    return this.storage[area].count;
  }

  auto(observable: Observable<any>, area: string = 'global') {
    this.start(area);
    return observable.pipe(
      finalize(() => this.stop(area)),
    );
  }

  isLoadingAnimated(area: string = 'global') {
    this.ensureKey(area);
    const isLoading = this.isLoading(area);
    return isLoading && this.storage[area].animated ? isLoading : 0;
  }
}
