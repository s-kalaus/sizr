import graphqlTag from 'graphql-tag';

export const productFetchAll = graphqlTag`
  query products($auctionId: ID!){
    products(auctionId: $auctionId){
      productId
      auctionId
      title
    }
  }
`;
