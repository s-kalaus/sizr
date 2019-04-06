import {
  createSelector,
  createFeatureSelector,
} from '@ngrx/store';
import { auctionAll, auctionMap, AuctionState } from '@app/reducer/auction.reducer';

export const selectAuctionState = createFeatureSelector<AuctionState>('auction');

export const selectAuctionAll = createSelector(
  selectAuctionState,
  auctionAll,
);

export const selectAuctionMap = createSelector(
  selectAuctionState,
  auctionMap,
);

export const selectAuctionOne = createSelector(
  selectAuctionMap,
  (entities, { auctionId }) => entities[auctionId],
);
