import graphqlTag from 'graphql-tag';

export const customerLogin = graphqlTag`
  mutation customerLogin($login: String!, $password: String!){
    customerLogin(login: $login, password: $password){
      token
    }
  }
`;
