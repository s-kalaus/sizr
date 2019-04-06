import {
  ActionsUnion,
  AuctionActionTypes,
} from '@app/action/auction.action';
import { Auction } from '@app/interface';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface AuctionState extends EntityState<Auction> {}

export const adapter: EntityAdapter<Auction> = createEntityAdapter<Auction>({
  selectId: auction => auction.auctionId,
});

export const initialState: AuctionState = adapter.getInitialState();

export function auctionReducer(
  state = initialState,
  action: ActionsUnion,
): AuctionState {
  switch (action.type) {
    case AuctionActionTypes.AuctionAll:
      return adapter.addAll(action.payload.auctions, state);
    case AuctionActionTypes.AuctionOne:
      return adapter.upsertOne(action.payload.auction, state);
    case AuctionActionTypes.AuctionRemove:
      return adapter.removeOne(action.payload.auction.auctionId, state);
    case AuctionActionTypes.AuctionProductCountIncrease:
      return adapter.map(
        (item) => {
          if (item.auctionId === action.payload.auctionId) {
            item.productsCount += 1;
          }
          return item;
        },
        state);
    case AuctionActionTypes.AuctionProductCountDecrease:
      return adapter.map(
        (item) => {
          if (item.auctionId === action.payload.auctionId) {
            item.productsCount -= 1;
          }
          return item;
        },
        state);
  }

  return state;
}

const {
  selectEntities,
  selectAll,
} = adapter.getSelectors();

export const auctionMap = selectEntities;

export const auctionAll = selectAll;
