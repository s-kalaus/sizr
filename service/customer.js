const { hash } = require('bcrypt');

class CustomerService {
  constructor(app) {
    this.app = app;
  }

  async getOne({ customerId, email }) {
    if (!email && !customerId) {
      return { success: false, message: 'Incorrent Customer fetch params' };
    }

    const customer = await this.app.sequelize.models.Customers.findOne({
      attributes: ['customerId', 'firstName', 'lastName', 'email'],
      where: {
        isDeleted: false,
        ...(customerId ? { customerId } : {}),
        ...(email ? { email } : {}),
      },
    });

    if (!customer) {
      return { success: false, message: 'Customer Not Found' };
    }

    const {
      customerId: theCustomerId,
      firstName, lastName,
      email: theEmail,
    } = customer;

    this.app.logger.info('CustomerService (getOne): %s', theCustomerId);

    return {
      success: true,
      data: {
        customerId: theCustomerId,
        firstName,
        lastName,
        email: theEmail,
      },
    };
  }

  async exists({ email }) {
    const exists = !!await this.app.sequelize.models.Customers.count({
      where: {
        email,
        isDeleted: false,
      },
    });

    this.app.logger.info('CustomerService (exists): %s, %s', email, exists);

    return {
      success: true,
      data: {
        exists,
      },
    };
  }

  async add({
    email,
    password,
    firstName,
    lastName,
  }) {
    const resultExists = await this.exists({ email });

    if (!resultExists.success) {
      return resultExists;
    }

    if (resultExists.data.exists) {
      return { success: false, message: 'Customer With This Email Already Exists' };
    }

    const passwordHash = password ? await hash(password, 4) : null;

    const customer = await this.app.sequelize.models.Customers.create({
      email,
      password,
      firstName,
      lastName,
      passwordHash,
    });

    if (!customer) {
      return { success: false, message: 'Customer Creation Error' };
    }

    this.app.logger.info('CustomerService (add): %s', customer.customerId);

    return {
      success: true,
      data: {
        customerId: customer.customerId,
      },
    };
  }
}

module.exports = CustomerService;
