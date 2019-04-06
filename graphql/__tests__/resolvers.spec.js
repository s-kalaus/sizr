const { PubSub } = require('graphql-subscriptions');
const resolversSpec = require('../resolvers');

describe('Resolvers', () => {
  const mockContext = {
    dataSources: {
      customerDS: { getOne: jest.fn(), add: jest.fn() },
      authDS: { login: jest.fn(), createToken: jest.fn() },
    },
  };
  const { getOne, add } = mockContext.dataSources.customerDS;
  const { login, createToken } = mockContext.dataSources.authDS;

  describe('Query', () => {
    describe('me', () => {
      it('call customerDS.getOne', async () => {
        await resolversSpec.Query.me({}, {}, mockContext);
        expect(getOne).toBeCalledWith({ customerId: undefined });
      });

      it('return proper data', async () => {
        getOne.mockReturnValueOnce({ foo: 'fighters' });
        const res = await resolversSpec.Query.me({}, {}, mockContext);
        expect(res).toEqual({ foo: 'fighters' });
      });
    });

    describe('token', () => {
      it('call authDS.createToken', async () => {
        await resolversSpec.Query.token(null, undefined, mockContext);
        expect(createToken).toBeCalledWith({ customerId: undefined });
      });

      it('return proper data', async () => {
        createToken.mockReturnValueOnce({ foo: 'fighters' });
        const res = await resolversSpec.Query.token(null, {}, mockContext);
        expect(res).toEqual({ foo: 'fighters' });
      });
    });
  });

  describe('Mutation', () => {
    describe('customerLogin', () => {
      const params = {
        login: 'login',
        password: 'password',
      };

      it('call authDS.login', async () => {
        await resolversSpec.Mutation.customerLogin(null, params, mockContext);
        expect(login).toBeCalledWith(params);
      });

      it('return proper data', async () => {
        login.mockReturnValueOnce({ foo: 'fighters' });
        const res = await resolversSpec.Mutation.customerLogin(null, params, mockContext);
        expect(res).toEqual({ foo: 'fighters' });
      });
    });

    describe('customerAdd', () => {
      const params = {
        email: 'email',
        password: 'password',
        firstName: 'firstName',
        lastName: 'lastName',
      };

      it('call customerDS.add', async () => {
        await resolversSpec.Mutation.customerAdd(null, params, mockContext);
        expect(add).toBeCalledWith(params);
      });

      it('return proper data', async () => {
        add.mockReturnValueOnce({ foo: 'fighters' });
        const res = await resolversSpec.Mutation.customerAdd(null, params, mockContext);
        expect(res).toEqual({ foo: 'fighters' });
      });
    });
  });

  describe('TokenPayload', () => {
    describe('customer', () => {
      const params = { customerId: 1 };

      it('call customerDS.getOne', async () => {
        await resolversSpec.TokenPayload.customer({}, params, mockContext);
        expect(getOne).toBeCalledWith(params);
      });

      it('uses user id from context to lookup trips', async () => {
        getOne.mockReturnValueOnce({ foo: 'fighters' });
        const res = await resolversSpec.TokenPayload.customer({}, params, mockContext);
        expect(res).toEqual({ foo: 'fighters' });
      });
    });

    describe('token', () => {
      const params = { customerId: 1 };

      it('call authDS.createToken', async () => {
        await resolversSpec.TokenPayload.token(null, params, mockContext);
        expect(createToken).toBeCalledWith(params);
      });

      it('call authDS.createToken (no customerId)', async () => {
        await resolversSpec.TokenPayload.token({}, {}, mockContext);
        expect(createToken).toBeCalledWith({ customerId: undefined });
      });

      it('return proper data', async () => {
        createToken.mockReturnValueOnce({ foo: 'fighters' });
        const res = await resolversSpec.TokenPayload.token({}, params, mockContext);
        expect(res).toEqual({ foo: 'fighters' });
      });
    });
  });

  describe('Subscription', () => {
    describe('messageAdded', () => {
      it('call pubsub.asyncIterator', () => {
        mockContext.pubsub = { asyncIterator: jest.fn() };
        resolversSpec.Subscription.messageAdded.subscribe(null, null, { app: mockContext });
        expect(mockContext.pubsub.asyncIterator).toBeCalledWith('newMessage');
      });

      it('filter work (target customer)', async () => {
        mockContext.pubsub = new PubSub();
        const iterator = resolversSpec.Subscription.messageAdded
          .subscribe(null, null, { app: mockContext, customerId: 1 });
        await mockContext.pubsub.publish('newMessage', { messageAdded: { customerId: 1 } });
        iterator.next();
      });

      it('filter work (other customer)', async () => {
        mockContext.pubsub = new PubSub();
        const iterator = resolversSpec.Subscription.messageAdded
          .subscribe(null, null, { app: mockContext, customerId: 1 });
        await mockContext.pubsub.publish('newMessage', { messageAdded: { customerId: 2 } });
        iterator.next();
      });
    });
  });
});
