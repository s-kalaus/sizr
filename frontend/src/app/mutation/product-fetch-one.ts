import graphqlTag from 'graphql-tag';

export const productFetchOne = graphqlTag`
  query product($productId: ID!){
    product(productId: $productId){
      productId
      auctionId
      title
    }
  }
`;
