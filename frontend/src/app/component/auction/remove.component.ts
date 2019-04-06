import { Component } from '@angular/core';
import { BaseComponent } from '@app/class/base.component';
import { Auction } from '@app/interface';
import { ActivatedRoute } from '@angular/router';
import { AuctionService } from '@app/service/auction.service';
import { AlertService, LayoutService, LoadingService } from '@app/service';
import { catchError, first, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { selectAuctionOne } from '@app/selector/auction.selector';

@Component({
  selector: 'app-auction-remove',
  templateUrl: './remove.component.html',
  styleUrls: ['./remove.component.scss'],
})
export class AuctionRemoveComponent extends BaseComponent {
  auction$: Observable<Auction>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private auctionService: AuctionService,
    public loadingService: LoadingService,
    public layoutService: LayoutService,
    public alertService: AlertService,
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
          catchError((err) => {
            this.layoutService.navigate(['auction']);
            return this.layoutService.processApiError(err);
          }),
        ).subscribe();
        this.auction$ = this.store.pipe(select(selectAuctionOne, { auctionId }));
      });
  }

  remove(auction: Auction) {
    this.auctionService.remove(auction).pipe(
      catchError(err => this.layoutService.processApiError(err)),
    ).subscribe(() => this.onSuccess());
  }

  onSuccess() {
    this.alertService.show({ text: 'auction.remove.error.success', type: 'success' });
    this.layoutService.navigate(['auction']);
  }
}
