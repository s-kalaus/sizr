import graphqlTag from 'graphql-tag';

export const auctionRemove = graphqlTag`
  mutation auctionRemove($auctionId: ID!){
    auctionRemove(auctionId: $auctionId) {
      success
    }
  }
`;
