const { allow, deny, shield } = require('graphql-shield');
const { graphql } = require('../../lib');

const pg = graphql.permissionsGroups();

const permissionsDef = shield({
  Query: {
    me: pg.c,
    token: pg.c,
    auction: pg.c,
    auctions: pg.c,
    product: pg.c,
    products: pg.c,
  },
  Customer: pg.c,
  Message: pg.c,
  Subscription: pg.c,
  Auction: pg.c,
  Product: pg.c,
  Mutation: {
    customerLogin: allow,
    customerAdd: allow,
    auctionAdd: pg.c,
    auctionUpdate: pg.c,
    auctionRemove: pg.c,
    productAdd: pg.c,
    productUpdate: pg.c,
    productRemove: pg.c,
  },
  AuctionPayload: pg.c,
  ProductPayload: pg.c,
  TokenPayload: pg.c,
  Result: allow,
}, {
  fallbackRule: deny,
});

module.exports = permissionsDef;
