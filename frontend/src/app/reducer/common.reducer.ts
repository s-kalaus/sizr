import {
  ActionsUnion,
  CommonActionTypes,
  CustomerSet,
  TokenSet,
} from '../action/common.action';
import { CommonState } from '@app/interface';

export const initialState: CommonState = {
  token: null,
  customer: null,
};

export function commonReducer(
  state = initialState,
  action: ActionsUnion,
): CommonState {
  switch (action.type) {
    case CommonActionTypes.TokenSet: {
      const payload = (action as TokenSet).payload;
      return {
        ...state,
        token: payload.token,
      };
    }
    case CommonActionTypes.CustomerSet: {
      const payload = (action as CustomerSet).payload;
      return {
        ...state,
        customer: { ...payload.customer },
      };
    }
  }

  return state;
}
