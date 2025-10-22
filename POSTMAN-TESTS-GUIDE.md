# 🚀 Guía de Pruebas con Postman - SportsLine API

## 📋 Instrucciones de Uso

### 1. Importar la Colección
1. Abrir Postman
2. Click en "Import"
3. Seleccionar el archivo `SportsLine-Postman-Collection.json`
4. La colección se importará automáticamente

### 2. Configurar Variables de Entorno
1. En Postman, ir a "Environments"
2. Crear un nuevo environment llamado "SportsLine Local"
3. Agregar las siguientes variables:
   - `base_url`: `http://localhost:3000`
   - `access_token`: (dejar vacío inicialmente)
   - `refresh_token`: (dejar vacío inicialmente)

### 3. Orden de Ejecución de Pruebas

#### Paso 1: Autenticación
1. **Register User** - Crear un usuario
2. **Login User** - Iniciar sesión
3. Copiar el `access_token` y `refresh_token` de la respuesta
4. Pegar estos tokens en las variables de entorno

#### Paso 2: Productos
1. **Create Product** - Crear un producto
2. **Get All Products** - Ver todos los productos
3. **Get Product by ID** - Ver producto específico
4. **Update Product** - Actualizar producto
5. **Delete Product** - Eliminar producto (opcional)

#### Paso 3: Clientes
1. **Create Client** - Crear un cliente
2. **Get All Clients** - Ver todos los clientes
3. **Get Client by ID** - Ver cliente específico
4. **Update Client** - Actualizar cliente
5. **Delete Client** - Eliminar cliente (opcional)

#### Paso 4: Pedidos
1. **Create Order** - Crear un pedido (usar IDs de cliente y producto creados)
2. **Get All Orders** - Ver todos los pedidos
3. **Get Order by ID** - Ver pedido específico
4. **Confirm Order** - Confirmar pedido
5. **Deliver Order** - Marcar como entregado
6. **Get Order Statistics** - Ver estadísticas

## 🔧 Datos de Prueba Sugeridos

### Usuario de Prueba
```json
{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "password": "password123",
  "rol": "vendedor"
}
```

### Producto de Prueba
```json
{
  "name": "Pelota de Fútbol",
  "description": "Pelota oficial de fútbol",
  "price": 25.99,
  "stock": 50,
  "category": "Deportes"
}
```

### Cliente de Prueba
```json
{
  "name": "María García",
  "email": "maria@example.com",
  "phone": "+1234567890",
  "address": "Calle Principal 123"
}
```

### Pedido de Prueba
```json
{
  "clientId": 1,
  "items": [
    {
      "productId": 1,
      "quantity": 2,
      "price": 25.99
    }
  ],
  "total": 51.98,
  "status": "pending"
}
```

## ⚠️ Notas Importantes

1. **Ejecutar en orden**: Las pruebas deben ejecutarse en el orden sugerido
2. **IDs dinámicos**: Los IDs de productos, clientes y pedidos se generan automáticamente
3. **Tokens**: Los tokens JWT expiran, usar "Refresh Token" cuando sea necesario
4. **Stock**: Al crear pedidos, se reduce automáticamente el stock de productos
5. **Roles**: Algunas operaciones requieren roles específicos (admin/vendedor)

## 🐛 Solución de Problemas

### Error 401 (Unauthorized)
- Verificar que el token esté en las variables de entorno
- Ejecutar "Login User" para obtener un nuevo token

### Error 400 (Bad Request)
- Verificar que los datos JSON estén bien formateados
- Asegurarse de que los IDs existan en la base de datos

### Error 500 (Internal Server Error)
- Verificar que el servidor esté corriendo (`npm run dev`)
- Revisar los logs del servidor

## 📊 Respuestas Esperadas

### Registro/Login Exitoso
```json
{
  "success": true,
  "message": "Usuario registrado exitosamente",
  "data": {
    "user": { ... },
    "tokens": {
      "accessToken": "...",
      "refreshToken": "..."
    }
  }
}
```

### Operación CRUD Exitosa
```json
{
  "success": true,
  "message": "Operación exitosa",
  "data": { ... }
}
```

### Error
```json
{
  "success": false,
  "message": "Descripción del error"
}
```
