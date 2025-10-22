// Mock de la base de datos para pruebas
jest.mock('../config/database', () => ({
  sequelize: {
    sync: jest.fn(),
    close: jest.fn(),
    authenticate: jest.fn()
  }
}));

// Mock de los modelos
jest.mock('../models/user.model', () => ({
  User: {
    init: jest.fn(),
    findByPk: jest.fn(),
    findOne: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn()
  }
}));

jest.mock('../models/product.model', () => ({
  Product: {
    init: jest.fn(),
    findByPk: jest.fn(),
    findOne: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn()
  }
}));

jest.mock('../models/client.model', () => ({
  Client: {
    init: jest.fn(),
    findByPk: jest.fn(),
    findOne: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn()
  }
}));

jest.mock('../models/order.model', () => ({
  Order: {
    init: jest.fn(),
    findByPk: jest.fn(),
    findOne: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn()
  }
}));

jest.mock('../models/orderItem.model', () => ({
  OrderItem: {
    init: jest.fn(),
    findByPk: jest.fn(),
    findOne: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn()
  }
}));

// Mock de variables de entorno para pruebas
process.env.JWT_SECRET = 'test-jwt-secret';
process.env.JWT_REFRESH_SECRET = 'test-jwt-refresh-secret';
process.env.JWT_EXPIRES_IN = '1h';
process.env.JWT_REFRESH_EXPIRES_IN = '7d';
process.env.DB_HOST = 'localhost';
process.env.DB_PORT = '5432';
process.env.DB_NAME = 'sportsline_test';
process.env.DB_USER = 'test_user';
process.env.DB_PASSWORD = 'test_password';
