import graphqlTag from 'graphql-tag';

export const productUpdate = graphqlTag`
  mutation productUpdate($productId: ID!){
    productUpdate(productId: $productId){
      product{
        productId
        auctionId
      }
    }
  }
`;
