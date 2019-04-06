const customerGetOne = require('./customer-get-one');
const customerLogin = require('./customer-login');
const customerAdd = require('./customer-add');
const auctionGetOne = require('./auction-get-one');
const auctionGetAll = require('./auction-get-all');
const auctionAdd = require('./auction-add');
const auctionUpdate = require('./auction-update');
const auctionRemove = require('./auction-remove');
const productGetOne = require('./product-get-one');
const productGetAll = require('./product-get-all');
const productAdd = require('./product-add');
const productUpdate = require('./product-update');
const productRemove = require('./product-remove');
const productCount = require('./product-count');
const tokenGetOne = require('./token-get-one');
const messageAdded = require('./message-added');

module.exports = {
  Query: {
    me: customerGetOne,
    auction: auctionGetOne,
    auctions: auctionGetAll,
    product: productGetOne,
    products: productGetAll,
    token: tokenGetOne,
  },
  Mutation: {
    customerLogin,
    customerAdd,
    auctionAdd,
    auctionUpdate,
    auctionRemove,
    productAdd,
    productUpdate,
    productRemove,
  },
  Subscription: {
    messageAdded,
  },
  TokenPayload: {
    customer: customerGetOne,
    token: tokenGetOne,
  },
  Auction: {
    productsCount: productCount,
  },
  AuctionPayload: {
    auction: auctionGetOne,
  },
  ProductPayload: {
    product: productGetOne,
  },
};
