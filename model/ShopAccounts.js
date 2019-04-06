module.exports = (sequelize, DataTypes) => {
  const ShopAccounts = sequelize.define('ShopAccounts', {
    shopAccountId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.STRING(16),
      unique: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(32),
      allowNull: false,
    },
  }, {
    timestamps: false,
  });

  return ShopAccounts;
};
