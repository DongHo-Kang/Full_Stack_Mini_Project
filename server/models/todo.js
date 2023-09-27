const { DataTypes } = require("sequelize");

const todo = (sequelize) => {
  return sequelize.define(
    "todo",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false, //Not Null
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING(100),
        allowNull: false, //Not Null
      },
      done: {
        type: DataTypes.TINYINT(1),
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      createdAt: false,
      updatedAt: false,
    }
  );
};

module.exports = todo;
