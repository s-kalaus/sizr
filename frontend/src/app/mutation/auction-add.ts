import graphqlTag from 'graphql-tag';

export const auctionAdd = graphqlTag`
  mutation auctionAdd($title: String!, $path: String!){
    auctionAdd(title: $title, path: $path){
      auction{
        auctionId
        title
        path
        productsCount
      }
    }
  }
`;
