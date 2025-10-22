// Constantes para mensajes de respuesta
export const MESSAGES = {
  // Mensajes de éxito
  SUCCESS: {
    USER_REGISTERED: 'Usuario registrado exitosamente',
    LOGIN_SUCCESS: 'Inicio de sesión exitoso',
    TOKENS_REFRESHED: 'Tokens renovados exitosamente',
    PROFILE_RETRIEVED: 'Perfil obtenido exitosamente',
    PRODUCT_CREATED: 'Producto creado exitosamente',
    PRODUCT_UPDATED: 'Producto actualizado exitosamente',
    PRODUCT_DELETED: 'Producto eliminado exitosamente',
    PRODUCTS_RETRIEVED: 'Productos obtenidos exitosamente',
    PRODUCT_RETRIEVED: 'Producto obtenido exitosamente',
    CLIENT_CREATED: 'Cliente creado exitosamente',
    CLIENT_UPDATED: 'Cliente actualizado exitosamente',
    CLIENT_DELETED: 'Cliente eliminado exitosamente',
    CLIENTS_RETRIEVED: 'Clientes obtenidos exitosamente',
    CLIENT_RETRIEVED: 'Cliente obtenido exitosamente',
    ORDER_CREATED: 'Pedido creado exitosamente',
    ORDER_UPDATED: 'Pedido actualizado exitosamente',
    ORDER_DELETED: 'Pedido eliminado exitosamente',
    ORDERS_RETRIEVED: 'Pedidos obtenidos exitosamente',
    ORDER_RETRIEVED: 'Pedido obtenido exitosamente',
    ORDER_CANCELLED: 'Pedido cancelado exitosamente',
    ORDER_CONFIRMED: 'Pedido confirmado exitosamente',
    ORDER_DELIVERED: 'Pedido entregado exitosamente',
    ORDER_HISTORY_RETRIEVED: 'Historial de pedidos obtenido exitosamente',
    ORDER_STATISTICS_RETRIEVED: 'Estadísticas de pedidos obtenidas exitosamente'
  },

  // Mensajes de error
  ERROR: {
    // Errores de autenticación
    INVALID_CREDENTIALS: 'Credenciales inválidas',
    EMAIL_ALREADY_EXISTS: 'El email ya está registrado',
    INVALID_REFRESH_TOKEN: 'Token de refresh inválido',
    USER_NOT_AUTHENTICATED: 'Usuario no autenticado',
    REFRESH_TOKEN_REQUIRED: 'Refresh token es requerido',
    
    // Errores de validación
    INVALID_INPUT_DATA: 'Datos de entrada inválidos',
    INVALID_QUERY_PARAMS: 'Parámetros de consulta inválidos',
    INVALID_ROUTE_PARAMS: 'Parámetros de ruta inválidos',
    
    // Errores de recursos
    USER_NOT_FOUND: 'Usuario no encontrado',
    PRODUCT_NOT_FOUND: 'Producto no encontrado',
    CLIENT_NOT_FOUND: 'Cliente no encontrado',
    ORDER_NOT_FOUND: 'Pedido no encontrado',
    
    // Errores de negocio
    PRODUCT_CODE_EXISTS: 'El código del producto ya existe',
    CLIENT_EMAIL_EXISTS: 'El email del cliente ya existe',
    CLIENT_DOCUMENT_EXISTS: 'El documento del cliente ya existe',
    INSUFFICIENT_STOCK: 'Stock insuficiente para el producto',
    
    // Errores del servidor
    INTERNAL_SERVER_ERROR: 'Error interno del servidor',
    DATABASE_ERROR: 'Error en la base de datos',
    ENCRYPTION_ERROR: 'Error en el cifrado de datos'
  }
} as const;

// Constantes para códigos de estado HTTP
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
} as const;

// Constantes para roles de usuario
export const USER_ROLES = {
  ADMIN: 'admin',
  VENDEDOR: 'vendedor'
} as const;

// Constantes para estados de pedido
export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  DELIVERED: 'delivered'
} as const;
