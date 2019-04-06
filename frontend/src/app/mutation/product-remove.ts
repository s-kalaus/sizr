import graphqlTag from 'graphql-tag';

export const productRemove = graphqlTag`
  mutation productRemove($productId: ID!){
    productRemove(productId: $productId) {
      success
    }
  }
`;
