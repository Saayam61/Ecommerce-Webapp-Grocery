/**
 * Database Initialization
 * 
 * This module initializes the database connection using Sequelize based on the provided configuration.
 * It tests the database connection and exports the Sequelize instance for use in other modules.
 */

const dbConfig = require("../dbConfig/dbConfig.js");
const Sequelize = require("sequelize");

// Create a Sequelize instance with database configuration
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      idle: dbConfig.pool.idle,
      acquire: dbConfig.pool.acquire
    }
  }
);

// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to the database successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
    process.exit(1); // Exit the process with a non-zero exit code to indicate failure
  });

// Create an object to hold Sequelize and sequelize instances
const db = {};

// Assign Sequelize and sequelize instances to the object
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import the Sequelize instance
const sequelize = require('../db');

// Import and define the model for each table
const User = require('../model/user')(sequelize, Sequelize);
const Product = require('../model/product')(sequelize, Sequelize);
const Category = require('../model/category')(sequelize, Sequelize);
const ProductImage = require('../model/productImage')(sequelize, Sequelize);
const Order = require('../model/order')(sequelize, Sequelize);
const OrderItem = require('../model/orderitem')(sequelize, Sequelize);
const Payment = require('../model/payment')(sequelize, Sequelize);
const Review = require('../model/review')(sequelize, Sequelize);
const Wishlist = require('../model/wishlist')(sequelize, Sequelize);
const Cart = require('../model/cart')(sequelize, Sequelize);
const ProductVariant = require('../model/productvariant')(sequelize, Sequelize);
const ShippingMethod = require('../model/shippingMethod')(sequelize, Sequelize);
const ThirdPartyIntegration = require('../model/ThirdPartyIntegration')(sequelize, Sequelize);

// Define associations between models
User.hasMany(Order);
Order.belongsTo(User);

Product.belongsTo(Category);
Category.hasMany(Product);

Product.hasMany(ProductImage);
ProductImage.belongsTo(Product);

Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);

Product.hasMany(OrderItem);
OrderItem.belongsTo(Product);

Order.hasOne(Payment);
Payment.belongsTo(Order);

Product.hasMany(Review);
Review.belongsTo(Product);

User.hasMany(Review);
Review.belongsTo(User);

User.hasMany(Wishlist);
Wishlist.belongsTo(User);

Product.hasMany(Wishlist);
Wishlist.belongsTo(Product);

User.hasMany(Cart);
Cart.belongsTo(User);

Product.hasMany(Cart);
Cart.belongsTo(Product);

Product.hasMany(ProductVariant);
ProductVariant.belongsTo(Product);

Order.hasOne(ShippingMethod);
ShippingMethod.belongsTo(Order);

// Export the object containing Sequelize and sequelize instances
module.exports = db;
