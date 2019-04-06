import graphqlTag from 'graphql-tag';

export const auctionUpdate = graphqlTag`
  mutation auctionUpdate($auctionId: ID!, $title: String, $path: String){
    auctionUpdate(auctionId: $auctionId, title: $title, path: $path){
      auction{
        auctionId
        title
        path
        productsCount
      }
    }
  }
`;
