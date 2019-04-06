import { Action } from '@ngrx/store';
import { Auction } from '@app/interface';

export enum AuctionActionTypes {
  AuctionAll = 'AUCTION_ALL',
  AuctionOne = 'AUCTION_ONE',
  AuctionProductCountIncrease = 'AUCTION_PRODUCT_COUNT_INCREASE',
  AuctionProductCountDecrease = 'AUCTION_PRODUCT_COUNT_DECREASE',
  AuctionRemove = 'AUCTION_REMOVE',
}

export class AuctionAll implements Action {
  readonly type = AuctionActionTypes.AuctionAll;
  constructor(public payload: { auctions: Auction[] }) {}
}

export class AuctionOne implements Action {
  readonly type = AuctionActionTypes.AuctionOne;
  constructor(public payload: { auction: Auction }) {}
}

export class AuctionProductCountIncrease implements Action {
  readonly type = AuctionActionTypes.AuctionProductCountIncrease;
  constructor(public payload: { auctionId: string }) {}
}

export class AuctionProductCountDecrease implements Action {
  readonly type = AuctionActionTypes.AuctionProductCountDecrease;
  constructor(public payload: { auctionId: string }) {}
}
export class AuctionRemove implements Action {
  readonly type = AuctionActionTypes.AuctionRemove;
  constructor(public payload: { auction: Auction }) {}
}

export type ActionsUnion =
  AuctionAll |
  AuctionOne |
  AuctionProductCountIncrease |
  AuctionProductCountDecrease |
  AuctionRemove;
