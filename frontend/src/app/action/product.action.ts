import { Action } from '@ngrx/store';
import { Product } from '@app/interface';

export enum ProductActionTypes {
  ProductAll = 'PRODUCT_ALL',
  ProductAdd = 'PRODUCT_ADD',
  ProductOne = 'PRODUCT_ONE',
  ProductRemove = 'PRODUCT_REMOVE',
}

export class ProductAll implements Action {
  readonly type = ProductActionTypes.ProductAll;
  constructor(public payload: { products: Product[], auctionId: string }) {}
}

export class ProductAdd implements Action {
  readonly type = ProductActionTypes.ProductAdd;
  constructor(public payload: { product: Product }) {}
}

export class ProductOne implements Action {
  readonly type = ProductActionTypes.ProductOne;
  constructor(public payload: { product: Product }) {}
}

export class ProductRemove implements Action {
  readonly type = ProductActionTypes.ProductRemove;
  constructor(public payload: { product: Product }) {}
}

export type ActionsUnion =
  ProductAll |
  ProductOne |
  ProductAdd |
  ProductRemove;
