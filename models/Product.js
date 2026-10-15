import { DataTypes } from "sequelize";
import { sequelize } from "./db.js";

const Product = sequelize.define("Product", {

  name: {type: DataTypes.STRING, allowNull: false},

  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },

  category: {
    type: DataTypes.STRING,
    allowNull: false
  },

  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },

  stock: {
    type: DataTypes.INTEGER,
    allowNull: false
  }

});

export { Product, sequelize };