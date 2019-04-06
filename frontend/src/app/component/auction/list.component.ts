import { Component } from '@angular/core';

import { LayoutService, LoadingService } from '@app/service';
import { BaseComponent } from '@app/class/base.component';
import { AuctionService } from '@app/service/auction.service';
import { Auction } from '@app/interface';
import { catchError } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectAuctionAll } from '@app/selector/auction.selector';

@Component({
  selector: 'app-auction-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class AuctionListComponent extends BaseComponent {
  auctions$: Observable<Auction[]>;

  constructor(
    private auctionService: AuctionService,
    public layoutService: LayoutService,
    public loadingService: LoadingService,
    private store: Store<{ auctionAll: Auction[] }>,
  ) {
    super();
    this.auctions$ = this.store.pipe(select(selectAuctionAll));
  }

  init() {
    this.auctionService.fetchAll().pipe(
      catchError(err => this.layoutService.processApiError(err)),
    ).subscribe();
  }
}
