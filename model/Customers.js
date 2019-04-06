module.exports = (sequelize, DataTypes) => {
  const Customers = sequelize.define('Customers', {
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    email: DataTypes.STRING(50),
    firstName: DataTypes.STRING(50),
    lastName: DataTypes.STRING(50),
    passwordHash: DataTypes.STRING(80),
  });

  return Customers;
};
