import graphqlTag from 'graphql-tag';

export const productAdd = graphqlTag`
  mutation productAdd($auctionId: ID!, $oid: String!){
    productAdd(auctionId: $auctionId, oid: $oid){
      product{
        productId
        auctionId
        title
      }
    }
  }
`;
