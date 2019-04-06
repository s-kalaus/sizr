const { pick } = require('lodash');

class ProductService {
  constructor(app) {
    this.app = app;
  }

  async getAll({
    customerId,
    auctionId,
    ext = {},
    includeDeleted = false,
  }) {
    const { customerShopAccountId = null, fields = [] } = ext;
    const fetchFields = ['productId', 'auctionId', 'title', ...fields];
    const list = await this.app.sequelize.models.Products.findAll({
      attributes: fetchFields,
      where: {
        ...includeDeleted ? {} : { isDeleted: false },
        customerId,
        auctionId,
        ...customerShopAccountId ? { customerShopAccountId } : {},
      },
    });

    this.app.logger.info('ProductService (getAll): %s', list.length);

    return {
      success: true,
      data: list.map(item => pick(item, fetchFields)),
    };
  }

  async getCount({
    customerId,
    auctionId,
    ext = {},
    includeDeleted = false,
  }) {
    const { customerShopAccountId = null } = ext;
    const count = await this.app.sequelize.models.Products.count({
      where: {
        ...includeDeleted ? {} : { isDeleted: false },
        customerId,
        auctionId,
        ...customerShopAccountId ? { customerShopAccountId } : {},
      },
    });

    this.app.logger.info('ProductService (getCount): %s', count);

    return {
      success: true,
      data: count,
    };
  }

  async getOne({ customerId, productId, ext = {} }) {
    const { customerShopAccountId = null, fields = [] } = ext;
    const fetchFields = ['productId', 'auctionId', 'title', ...fields];
    const product = await this.app.sequelize.models.Products.findOne({
      attributes: fetchFields,
      where: {
        isDeleted: false,
        customerId,
        productId,
        ...customerShopAccountId ? { customerShopAccountId } : {},
      },
    });

    if (!product) {
      return { success: false, message: 'Product Not Found' };
    }

    this.app.logger.info('ProductService (getOne): %s', productId);

    return {
      success: true,
      data: pick(product, fetchFields),
    };
  }

  async add({
    customerId,
    auctionId,
    title,
    oid,
    ext = {},
  }) {
    const { customerShopAccountId = null } = ext;
    const sameTitle = await this.app.sequelize.models.Products.count({
      where: {
        isDeleted: false,
        auctionId,
        customerId,
        ...customerShopAccountId ? { customerShopAccountId } : {},
        title,
      },
    });

    if (sameTitle) {
      return {
        success: false,
        message: 'Product with the same title already exists',
        form: {
          title: 'same',
        },
      };
    }

    const sameOid = await this.app.sequelize.models.Products.count({
      where: {
        isDeleted: false,
        auctionId,
        customerId,
        ...customerShopAccountId ? { customerShopAccountId } : {},
        oid,
      },
    });

    if (sameOid) {
      return {
        success: false,
        message: 'Product with the same remote ID already exists',
        form: {
          oid: 'same',
        },
      };
    }

    const transaction = await this.app.sequelize.transaction();

    const product = await this.app.sequelize.models.Products.create({
      customerId,
      auctionId,
      title,
      oid,
      ...customerShopAccountId ? { customerShopAccountId } : {},
    }, { transaction });

    const { productId } = product;

    if (customerShopAccountId) {
      try {
        const result = await this.app.service.ShopProductService.getOne({
          oid,
          customerShopAccountId,
        });

        await this.app.sequelize.models.Products.update({
          title: result.title,
        }, {
          fields: ['title'],
          where: {
            productId,
          },
          transaction,
        });
      } catch ({ message }) {
        await transaction.rollback();
        return {
          success: false,
          message,
        };
      }
    }

    await transaction.commit();

    this.app.logger.info('ProductService (add): %s', productId);

    return {
      success: true,
      data: {
        productId,
      },
    };
  }

  async update({
    customerId,
    productId,
    ext = {},
  }) {
    const { customerShopAccountId = null } = ext;
    if (!productId) {
      return {
        success: false,
        message: 'Product ID Not Set',
      };
    }

    const { oid } = await this.getOne({ customerId, productId, ext: { fields: ['oid'] } });

    const data = {};

    const transaction = await this.app.sequelize.transaction();

    await this.app.sequelize.models.Products.update(data, {
      fields: Object.keys(data),
      where: {
        productId,
        ...customerShopAccountId ? { customerShopAccountId } : {},
      },
      transaction,
    });

    if (customerShopAccountId) {
      try {
        const result = await this.app.service.ShopProductService.getOne({
          oid,
          customerShopAccountId,
        });

        await this.app.sequelize.models.Products.update({
          title: result.title,
        }, {
          fields: ['title'],
          where: {
            productId,
          },
          transaction,
        });
      } catch (err) {
        await transaction.rollback();
        return {
          success: false,
          message: JSON.stringify(err),
        };
      }
    }

    await transaction.commit();

    this.app.logger.info('ProductService (update): %s', productId);

    return {
      success: true,
      data: {
        productId,
      },
    };
  }

  async remove({
    customerId,
    productId,
    ext = {},
  }) {
    const { customerShopAccountId = null } = ext;

    if (!productId) {
      return {
        success: false,
        message: 'Product ID Not Set',
      };
    }

    await this.getOne({ customerId, productId, ext });

    await this.app.sequelize.models.Products.destroy({
      where: {
        productId,
        ...customerShopAccountId ? { customerShopAccountId } : {},
      },
    });

    this.app.logger.info('ProductService (remove): %s', productId);

    return {
      success: true,
      data: {
        productId,
      },
    };
  }
}

module.exports = ProductService;
