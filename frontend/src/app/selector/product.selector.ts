import {
  createSelector,
  createFeatureSelector,
} from '@ngrx/store';
import { productAll, productMap, ProductState } from '@app/reducer/product.reducer';

export const selectProductState = createFeatureSelector<ProductState>('product');

export const selectProductAll = createSelector(
  selectProductState,
  productAll,
);

export const selectProductMap = createSelector(
  selectProductState,
  productMap,
);

export const selectProductIdsByAuction = createSelector(
  selectProductState,
  ({ byAuctionId, entities }, { auctionId }) => byAuctionId[auctionId],
);

export const selectProductAllByAuction = createSelector(
  [selectProductAll, selectProductIdsByAuction],
  (products, ids) => products.filter(({ productId }) => ids.includes(productId)),
);

export const selectProductOne = createSelector(
  selectProductMap,
  (entities, { productId }) => entities[productId],
);
