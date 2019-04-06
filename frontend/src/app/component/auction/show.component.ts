import { Component } from '@angular/core';
import { BaseComponent } from '@app/class/base.component';
import { Auction } from '@app/interface';
import { ActivatedRoute } from '@angular/router';
import { AuctionService } from '@app/service/auction.service';
import { LayoutService, LoadingService } from '@app/service';
import { catchError, first, map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectAuctionOne } from '@app/selector/auction.selector';

@Component({
  selector: 'app-auction-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss'],
})
export class AuctionShowComponent extends BaseComponent {
  auction$: Observable<Auction>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private auctionService: AuctionService,
    public loadingService: LoadingService,
    public layoutService: LayoutService,
    private store: Store<{ auctionOne: Auction }>,
  ) {
    super();
  }

  init() {
    this.activatedRoute.params
      .pipe(
        first(),
        map(params => params.auctionId),
      )
      .subscribe((auctionId) => {
        this.auctionService.fetchOne(auctionId).pipe(
          catchError(err => this.layoutService.processApiError(err)),
        ).subscribe();
        this.auction$ = this.store.pipe(select(selectAuctionOne, { auctionId }));
      });
  }
}
