module.exports = (sequelize, DataTypes) => {
  const CustomerShopAccounts = sequelize.define('CustomerShopAccounts', {
    customerShopAccountId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    shop: {
      type: DataTypes.STRING(200),
      unique: true,
      allowNull: false,
    },
    token: DataTypes.STRING(32),
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  });

  CustomerShopAccounts.associate = (models) => {
    CustomerShopAccounts.belongsTo(models.ShopAccounts, {
      foreignKey: 'shopAccountId',
    });
  };

  return CustomerShopAccounts;
};
