# Instrucciones para Ejecutar el Proyecto SportsLine

## Opción 1: Usando SQLite (Recomendado para desarrollo)

El proyecto está configurado para usar SQLite por defecto cuando PostgreSQL no está disponible.

### Pasos:

1. **Instalar dependencias:**
```bash
npm install
```

2. **Ejecutar el proyecto:**
```bash
npm run dev
```

3. **Verificar que funciona:**
```bash
curl http://localhost:3000
# Debería responder: "Servidor corriendo con exito"
```

4. **Probar registro de usuario:**
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com", 
    "password": "password123",
    "rol": "vendedor"
  }'
```

## Opción 2: Usando PostgreSQL

Si prefieres usar PostgreSQL:

### Pasos:

1. **Instalar y configurar PostgreSQL:**
```bash
# En Ubuntu/Debian
sudo apt update
sudo apt install postgresql postgresql-contrib

# Iniciar PostgreSQL
sudo service postgresql start

# Crear base de datos
sudo -u postgres createdb sportsline_db
```

2. **Configurar variables de entorno:**
Editar el archivo `.env` y descomentar las líneas de PostgreSQL:
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=sportsline_db
DB_USER=postgres
DB_PASSWORD=tu_password
```

3. **Ejecutar el proyecto:**
```bash
npm run dev
```

## Opción 3: Usando Docker

Si tienes Docker disponible:

### Pasos:

1. **Ejecutar PostgreSQL con Docker:**
```bash
docker run --name sportsline-postgres \
  -e POSTGRES_DB=sportsline_db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=password \
  -p 5432:5432 \
  -d postgres:13
```

2. **Configurar variables de entorno:**
Editar `.env` con las credenciales de Docker:
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=sportsline_db
DB_USER=postgres
DB_PASSWORD=password
```

3. **Ejecutar el proyecto:**
```bash
npm run dev
```

## Scripts Disponibles

- `npm run dev` - Ejecutar en modo desarrollo
- `npm run build` - Compilar TypeScript
- `npm start` - Ejecutar en modo producción
- `npm test` - Ejecutar pruebas
- `npm run test:coverage` - Ejecutar pruebas con cobertura

## Endpoints Disponibles

### Autenticación
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/refresh` - Renovar tokens
- `GET /api/auth/profile` - Obtener perfil

### Productos
- `GET /api/products` - Listar productos
- `POST /api/products` - Crear producto
- `GET /api/products/:id` - Obtener producto
- `PUT /api/products/:id` - Actualizar producto
- `DELETE /api/products/:id` - Eliminar producto

### Clientes
- `GET /api/clients` - Listar clientes
- `POST /api/clients` - Crear cliente
- `GET /api/clients/:id` - Obtener cliente
- `PUT /api/clients/:id` - Actualizar cliente
- `DELETE /api/clients/:id` - Eliminar cliente

### Pedidos
- `GET /api/orders` - Listar pedidos
- `POST /api/orders` - Crear pedido
- `GET /api/orders/:id` - Obtener pedido
- `PUT /api/orders/:id` - Actualizar pedido
- `DELETE /api/orders/:id` - Eliminar pedido

## Solución de Problemas

### Error: "No Sequelize instance passed"
- **Causa:** Los modelos se inicializan antes de que Sequelize esté configurado
- **Solución:** Ya está solucionado en el código actual

### Error: "Connection refused" (PostgreSQL)
- **Causa:** PostgreSQL no está ejecutándose
- **Solución:** Usar SQLite o iniciar PostgreSQL

### Error: "Database does not exist"
- **Causa:** La base de datos no existe
- **Solución:** Crear la base de datos o usar SQLite

## Notas Importantes

- El proyecto usa **cifrado híbrido** para datos sensibles
- Los **tokens JWT** tienen expiración de 8 horas por defecto
- La base de datos se crea automáticamente con SQLite
- Los modelos se sincronizan automáticamente al iniciar
