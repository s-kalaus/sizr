import { ActionsUnion, ProductActionTypes } from '@app/action/product.action';
import { Product } from '@app/interface';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface ProductState extends EntityState<Product> {
  byAuctionId: {
    [auctionId: string]: string[],
  };
}

export const adapter: EntityAdapter<Product> = createEntityAdapter<Product>({
  selectId: product => product.productId,
});

export const initialState: ProductState = adapter.getInitialState({
  byAuctionId: {},
});

export function productReducer(
  state = initialState,
  action: ActionsUnion,
): ProductState {
  switch (action.type) {
    case ProductActionTypes.ProductAll:
      return adapter.upsertMany(action.payload.products, {
        ...state,
        byAuctionId: {
          ...state.byAuctionId,
          [action.payload.auctionId]: action.payload.products
            .map(product => product.productId),
        },
      });
    case ProductActionTypes.ProductAdd: {
      const { productId, auctionId } = action.payload.product;
      return adapter.upsertOne(action.payload.product, {
        ...state,
        byAuctionId: {
          ...state.byAuctionId,
          [auctionId]: [
            ...state.byAuctionId[auctionId] || [],
            productId,
          ],
        },
      });
    }
    case ProductActionTypes.ProductOne:
      return adapter.upsertOne(action.payload.product, state);
    case ProductActionTypes.ProductRemove: {
      const { productId, auctionId } = action.payload.product;
      return adapter.removeOne(productId, {
        ...state,
        byAuctionId: {
          ...state.byAuctionId,
          [auctionId]: state.byAuctionId[auctionId]
            .filter(theProductId => theProductId !== productId),
        },
      });
    }
  }

  return state;
}

const {
  selectEntities,
  selectAll,
} = adapter.getSelectors();

export const productMap = selectEntities;

export const productAll = selectAll;
