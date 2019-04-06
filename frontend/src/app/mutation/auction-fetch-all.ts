import graphqlTag from 'graphql-tag';

export const auctionFetchAll = graphqlTag`
  query{
    auctions{
      auctionId
      title
      path
      productsCount
    }
  }
`;
