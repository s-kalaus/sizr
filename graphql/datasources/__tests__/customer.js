const CustomerDS = require('../customer');

describe('CustomerDS', () => {
  const errorResponse = {
    success: false,
    message: 'Error',
  };
  const mockApp = {
    service: {
      CustomerService: {
        getOne: jest.fn(),
        add: jest.fn(),
      },
    },
    dataSource: {
      authDS: {
        login: jest.fn(),
      },
    },
  };
  const { getOne, add } = mockApp.service.CustomerService;
  const { login } = mockApp.dataSource.authDS;
  const service = new CustomerDS(mockApp);
  service.initialize({ context: { customerId: 1 } });

  describe('getOne', () => {
    const successResponse = {
      success: true,
      data: {
        firstName: 'firstName',
        lastName: 'lastName',
        email: 'email',
      },
    };

    it('call service with default customerId', async () => {
      getOne.mockReturnValueOnce(successResponse);
      await service.getOne();
      expect(getOne).toBeCalledWith({
        customerId: 1,
      });
    });

    it('call service with specific customerId', async () => {
      getOne.mockReturnValueOnce(successResponse);
      await service.getOne({ customerId: 2 });
      expect(getOne).toBeCalledWith({
        customerId: 2,
      });
    });

    it('return proper data', async () => {
      getOne.mockReturnValueOnce(successResponse);
      const result = await service.getOne();
      expect(result).toEqual({
        customerId: 1,
        firstName: 'firstName',
        lastName: 'lastName',
        email: 'email',
      });
    });

    it('return handle error', async () => {
      getOne.mockReturnValueOnce(errorResponse);
      expect(service.getOne()).rejects.toEqual(new Error(errorResponse.message));
    });
  });

  describe('add', () => {
    const successResponse = {
      success: true,
    };
    const params = {
      email: 'email',
      password: 'password',
      firstName: 'firstName',
      lastName: 'lastName',
    };

    it('call service', async () => {
      add.mockReturnValueOnce(successResponse);
      login.mockReturnValueOnce(successResponse);
      await service.add(params);
      expect(add).toBeCalledWith(params);
    });

    it('call authDS.login', async () => {
      add.mockReturnValueOnce(successResponse);
      login.mockReturnValueOnce(successResponse);
      await service.add(params);
      expect(mockApp.dataSource.authDS.login).toBeCalledWith({
        login: params.email,
        password: params.password,
      });
    });

    it('return proper data', async () => {
      add.mockReturnValueOnce(successResponse);
      login.mockReturnValueOnce(successResponse);
      const result = await service.add(params);
      expect(result).toEqual({
        success: true,
      });
    });

    it('return handle error', async () => {
      add.mockReturnValueOnce(errorResponse);
      expect(service.add(params)).rejects.toEqual(new Error(errorResponse.message));
    });
  });
});
