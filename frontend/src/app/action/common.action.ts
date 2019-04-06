import { Action } from '@ngrx/store';
import { Customer, Token } from '@app/interface';

export enum CommonActionTypes {
  TokenSet = 'TOKEN_SET',
  CustomerSet = 'CUSTOMER_SET',
}

export class TokenSet implements Action {
  readonly type = CommonActionTypes.TokenSet;
  constructor(public payload: { token: Token | null }) {}
}

export class CustomerSet implements Action {
  readonly type = CommonActionTypes.CustomerSet;
  constructor(public payload: { customer: Customer | null }) {}
}

export type ActionsUnion =
  TokenSet |
  CustomerSet;
