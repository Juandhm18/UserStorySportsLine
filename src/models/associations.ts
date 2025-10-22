import User from './user.model';
import Client from './client.model';
import Product from './product.model';
import Order from './order.model';
import OrderItem from './orderItem.model';

// Asociaciones entre User y Order
User.hasMany(Order, {
  foreignKey: 'userId',
  as: 'orders'
});

Order.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
});

// Asociaciones entre Client y Order
Client.hasMany(Order, {
  foreignKey: 'clientId',
  as: 'orders'
});

Order.belongsTo(Client, {
  foreignKey: 'clientId',
  as: 'client'
});

// Asociaciones entre Order y OrderItem
Order.hasMany(OrderItem, {
  foreignKey: 'orderId',
  as: 'items'
});

OrderItem.belongsTo(Order, {
  foreignKey: 'orderId',
  as: 'order'
});

// Asociaciones entre Product y OrderItem
Product.hasMany(OrderItem, {
  foreignKey: 'productId',
  as: 'orderItems'
});

OrderItem.belongsTo(Product, {
  foreignKey: 'productId',
  as: 'product'
});

// Asociación muchos a muchos entre Order y Product a través de OrderItem
Order.belongsToMany(Product, {
  through: OrderItem,
  foreignKey: 'orderId',
  otherKey: 'productId',
  as: 'products'
});

Product.belongsToMany(Order, {
  through: OrderItem,
  foreignKey: 'productId',
  otherKey: 'orderId',
  as: 'orders'
});

export {
  User,
  Client,
  Product,
  Order,
  OrderItem
};
