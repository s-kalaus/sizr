const yup = require('yup');
const { validator } = require('../../lib/graphql');

const auction = () => yup.object().shape({
  title: yup
    .string()
    .max(50),
  path: yup
    .string()
    .max(30),
});

const validatorsDef = validator({
  Query: {
    auction: yup.object().shape({
      auctionId: yup
        .number(),
    }),
  },
  Mutation: {
    customerLogin: yup.object().shape({
      login: yup
        .string()
        .email()
        .max(200),
      password: yup
        .string()
        .max(30),
    }),
    customerAdd: yup.object().shape({
      email: yup
        .string()
        .email()
        .max(50),
      password: yup
        .string()
        .min(8)
        .max(30),
      firstName: yup
        .string()
        .min(1)
        .max(30),
      lastName: yup
        .string()
        .min(1)
        .max(30),
    }),
    auctionAdd: auction(),
    auctionUpdate: auction(),
  },
});

module.exports = validatorsDef;
