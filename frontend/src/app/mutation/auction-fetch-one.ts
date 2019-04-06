import graphqlTag from 'graphql-tag';

export const auctionFetchOne = graphqlTag`
  query auction($auctionId: ID!){
    auction(auctionId: $auctionId){
      auctionId
      title
      path
      productsCount
    }
  }
`;
