"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerUi = exports.specs = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
exports.swaggerUi = swagger_ui_express_1.default;
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'SportsLine API',
            version: '1.0.0',
            description: 'API para la gestión de productos, clientes y pedidos de SportsLine',
            contact: {
                name: 'SportsLine Team',
                email: 'support@sportsline.com'
            }
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Servidor de desarrollo'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            },
            schemas: {
                Error: {
                    type: 'object',
                    properties: {
                        success: {
                            type: 'boolean',
                            example: false
                        },
                        message: {
                            type: 'string',
                            example: 'Error message'
                        }
                    }
                },
                Success: {
                    type: 'object',
                    properties: {
                        success: {
                            type: 'boolean',
                            example: true
                        },
                        message: {
                            type: 'string',
                            example: 'Operation successful'
                        }
                    }
                },
                User: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            example: 1
                        },
                        name: {
                            type: 'string',
                            example: 'Juan Pérez'
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            example: 'juan@example.com'
                        },
                        rol: {
                            type: 'string',
                            enum: ['admin', 'vendedor'],
                            example: 'admin'
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time'
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time'
                        }
                    }
                },
                Product: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            example: 1
                        },
                        code: {
                            type: 'string',
                            example: 'PROD-001'
                        },
                        name: {
                            type: 'string',
                            example: 'Balón de Fútbol'
                        },
                        price: {
                            type: 'number',
                            format: 'decimal',
                            example: 25.99
                        },
                        stock: {
                            type: 'integer',
                            example: 50
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time'
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time'
                        }
                    }
                },
                Client: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            example: 1
                        },
                        name: {
                            type: 'string',
                            example: 'María García'
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            example: 'maria@example.com'
                        },
                        phone: {
                            type: 'string',
                            example: '+1234567890'
                        },
                        address: {
                            type: 'string',
                            example: 'Calle Principal 123'
                        },
                        document: {
                            type: 'string',
                            example: '12345678'
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time'
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time'
                        }
                    }
                },
                Order: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            example: 1
                        },
                        clientId: {
                            type: 'integer',
                            example: 1
                        },
                        userId: {
                            type: 'integer',
                            example: 1
                        },
                        total: {
                            type: 'number',
                            format: 'decimal',
                            example: 129.95
                        },
                        status: {
                            type: 'string',
                            enum: ['pending', 'confirmed', 'cancelled', 'delivered'],
                            example: 'pending'
                        },
                        notes: {
                            type: 'string',
                            example: 'Entrega urgente'
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time'
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time'
                        },
                        client: {
                            $ref: '#/components/schemas/Client'
                        },
                        user: {
                            $ref: '#/components/schemas/User'
                        },
                        items: {
                            type: 'array',
                            items: {
                                $ref: '#/components/schemas/OrderItem'
                            }
                        }
                    }
                },
                OrderItem: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            example: 1
                        },
                        productId: {
                            type: 'integer',
                            example: 1
                        },
                        quantity: {
                            type: 'integer',
                            example: 2
                        },
                        unitPrice: {
                            type: 'number',
                            format: 'decimal',
                            example: 25.99
                        },
                        subtotal: {
                            type: 'number',
                            format: 'decimal',
                            example: 51.98
                        },
                        product: {
                            $ref: '#/components/schemas/Product'
                        }
                    }
                }
            }
        },
        security: [
            {
                bearerAuth: []
            }
        ]
    },
    apis: ['./src/routes/*.ts', './src/controllers/*.ts']
};
const specs = (0, swagger_jsdoc_1.default)(options);
exports.specs = specs;
//# sourceMappingURL=swagger.js.map