# SportsLine - Backend API

Una API REST robusta y escalable para la gestión de productos, clientes y pedidos de la empresa SportsLine, desarrollada con Node.js, TypeScript y PostgreSQL.

## Tabla de Contenidos

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Arquitectura](#arquitectura)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Uso](#uso)
- [API Endpoints](#api-endpoints)
- [Autenticación](#autenticación)
- [Cifrado](#cifrado)
- [Pruebas](#pruebas)
- [Docker](#docker)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Contribución](#contribución)
- [Licencia](#licencia)

## Características

- **Autenticación JWT** con refresh tokens
- **Cifrado híbrido** (AES-256-GCM + RSA) para datos sensibles
- **CRUD completo** para productos, clientes y pedidos
- **Autorización basada en roles** (admin, vendedor)
- **Validación robusta** con Zod
- **Pruebas unitarias** con Jest
- **Containerización** con Docker
- **Arquitectura limpia** siguiendo principios SOLID
- **Manejo de inventario** y control de stock

## Tecnologías

### Backend
- **Node.js** - Runtime de JavaScript
- **TypeScript** - Tipado estático
- **Express.js** - Framework web
- **PostgreSQL** - Base de datos relacional
- **Sequelize** - ORM para PostgreSQL

### Seguridad
- **JWT** - Autenticación y autorización
- **bcrypt** - Hash de contraseñas
- **AES-256-GCM** - Cifrado simétrico
- **RSA** - Cifrado asimétrico

### Desarrollo
- **Jest** - Framework de pruebas
- **Docker** - Containerización
- **Zod** - Validación de esquemas

## Arquitectura

El proyecto sigue una arquitectura en capas con separación clara de responsabilidades:

```
┌─────────────────┐
│   Controllers   │ ← Manejo de requests/responses
├─────────────────┤
│    Services     │ ← Lógica de negocio
├─────────────────┤
│      DAOs       │ ← Acceso a datos
├─────────────────┤
│     Models      │ ← Definición de entidades
├─────────────────┤
│   Database      │ ← PostgreSQL
└─────────────────┘
```

### Principios Aplicados
- **SOLID** - Principios de diseño orientado a objetos
- **DRY** - Don't Repeat Yourself
- **Clean Code** - Código limpio y mantenible
- **Separation of Concerns** - Separación de responsabilidades

## Instalación

### Prerrequisitos
- Node.js (v18 o superior)
- PostgreSQL (v13 o superior)
- Docker (opcional)

### Instalación Local

1. **Clonar el repositorio**
```bash
git clone https://github.com/Juandhm18/UserStorySportsLine.git
cd UserStorySportsLine
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env
# Editar .env con tus configuraciones
```

4. **Configurar Supabase PostgreSQL**

```bash
# 1. Crear cuenta gratuita en https://supabase.com
# 2. Crear un nuevo proyecto
# 3. Ir a Settings → Database
# 4. Copiar la Connection string (URI)
# 5. Actualizar .env con tu URI:
DATABASE_URL=postgresql://postgres:tu-contraseña@db.tu-proyecto.supabase.co:5432/postgres
```

Para más detalles, consulta `SUPABASE-SETUP.md`.

5. **Iniciar el servidor**
```bash
# Desarrollo
npm run dev

# Producción
npm run build
npm start
```

### Instalación con Docker

```bash
# Construir y ejecutar con Docker Compose
docker-compose up --build

# Solo la base de datos
docker-compose up -d postgres
```

## Configuración

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# Supabase PostgreSQL URI
DATABASE_URL=postgresql://postgres:tu-contraseña@db.tu-proyecto.supabase.co:5432/postgres

# JWT
JWT_SECRET=tu_jwt_secret_super_seguro
JWT_REFRESH_SECRET=tu_refresh_secret_super_seguro
JWT_EXPIRES_IN=1h
JWT_REFRESH_EXPIRES_IN=7d

# Servidor
PORT=3000
NODE_ENV=development

# Cifrado RSA (opcional - se generan automáticamente)
RSA_PUBLIC_KEY=tu_clave_publica_rsa
RSA_PRIVATE_KEY=tu_clave_privada_rsa
```

## Uso

### Iniciar el Servidor

```bash
# Modo desarrollo (con hot reload)
npm run dev

# Modo producción
npm run build
npm start
```

El servidor estará disponible en `http://localhost:3000`

## API Endpoints

### Autenticación
```
POST   /api/auth/register     - Registrar usuario
POST   /api/auth/login        - Iniciar sesión
POST   /api/auth/refresh      - Renovar tokens
GET    /api/auth/profile      - Obtener perfil
```

### Productos
```
GET    /api/products          - Listar productos
GET    /api/products/:id      - Obtener producto
POST   /api/products          - Crear producto
PUT    /api/products/:id      - Actualizar producto
DELETE /api/products/:id      - Eliminar producto
```

### Clientes
```
GET    /api/clients           - Listar clientes
GET    /api/clients/:id       - Obtener cliente
POST   /api/clients           - Crear cliente
PUT    /api/clients/:id       - Actualizar cliente
DELETE /api/clients/:id       - Eliminar cliente
```

### Pedidos
```
GET    /api/orders            - Listar pedidos
GET    /api/orders/:id        - Obtener pedido
POST   /api/orders            - Crear pedido
PUT    /api/orders/:id        - Actualizar pedido
DELETE /api/orders/:id        - Eliminar pedido
GET    /api/orders/client/:id - Pedidos por cliente
GET    /api/orders/status/:status - Pedidos por estado
POST   /api/orders/:id/cancel - Cancelar pedido
POST   /api/orders/:id/confirm - Confirmar pedido
POST   /api/orders/:id/deliver - Marcar como entregado
```

## Autenticación

### Registro de Usuario
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "password": "password123",
    "rol": "vendedor"
  }'
```

### Inicio de Sesión
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "juan@example.com",
    "password": "password123"
  }'
```

### Uso de Tokens
```bash
curl -X GET http://localhost:3000/api/products \
  -H "Authorization: Bearer tu_access_token"
```

## Cifrado

El sistema implementa cifrado híbrido para datos sensibles:

- **AES-256-GCM**: Para cifrar los datos
- **RSA-2048**: Para cifrar las claves AES
- **bcrypt**: Para hashear contraseñas

### Ejemplo de Cifrado
```typescript
import EncryptionService from './services/encryption.service';

// Cifrar datos
const encrypted = EncryptionService.encryptHybrid('datos sensibles');

// Descifrar datos
const decrypted = EncryptionService.decryptHybrid(encrypted);
```

## Pruebas

### Ejecutar Pruebas
```bash
# Todas las pruebas
npm test

# Pruebas en modo watch
npm run test:watch

# Pruebas con cobertura
npm run test:coverage
```

### Estructura de Pruebas
```
src/tests/
├── controllers/     # Pruebas de controladores
├── services/        # Pruebas de servicios
├── middlewares/     # Pruebas de middlewares
└── setup.ts         # Configuración de pruebas
```

## Docker

### Dockerfile
El proyecto incluye un Dockerfile optimizado para producción:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
EXPOSE 3000
CMD ["npm", "start"]
```

### Docker Compose
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    depends_on:
      - postgres

  postgres:
    image: postgres:13
    environment:
      POSTGRES_DB: sportsline_db
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
```

## Estructura del Proyecto

```
src/
├── config/          # Configuraciones
│   └── database.ts  # Configuración de BD
├── constants/       # Constantes
│   └── messages.ts  # Mensajes y códigos HTTP
├── controllers/     # Controladores
│   ├── auth.controller.ts
│   ├── product.controller.ts
│   ├── client.controller.ts
│   └── order.controller.ts
├── dao/            # Data Access Objects
│   ├── user.dao.ts
│   ├── product.dao.ts
│   ├── client.dao.ts
│   └── order.dao.ts
├── dto/            # Data Transfer Objects
│   ├── auth.dto.ts
│   ├── product.dto.ts
│   ├── client.dto.ts
│   └── order.dto.ts
├── middlewares/    # Middlewares
│   ├── auth.middleware.ts
│   ├── validation.middleware.ts
│   └── encryption.middleware.ts
├── models/         # Modelos de Sequelize
│   ├── user.model.ts
│   ├── product.model.ts
│   ├── client.model.ts
│   ├── order.model.ts
│   └── orderItem.model.ts
├── routes/         # Rutas
│   ├── auth.routes.ts
│   ├── product.routes.ts
│   ├── client.routes.ts
│   └── order.routes.ts
├── services/       # Servicios de negocio
│   ├── auth.service.ts
│   ├── product.service.ts
│   ├── client.service.ts
│   ├── order.service.ts
│   ├── jwt.service.ts
│   └── encryption.service.ts
├── utils/          # Utilidades
│   ├── response.util.ts
│   └── validation.util.ts
├── tests/          # Pruebas
│   ├── controllers/
│   ├── services/
│   └── middlewares/
├── seeders/        # Datos de prueba
│   └── seed.ts
├── app.ts          # Aplicación principal
└── index.ts        # Punto de entrada
```

## Scripts Disponibles

```bash
npm run dev          # Desarrollo con hot reload
npm run build        # Compilar TypeScript
npm start            # Iniciar en producción
npm test             # Ejecutar pruebas
npm run test:watch   # Pruebas en modo watch
npm run test:coverage # Pruebas con cobertura
npm run seed         # Poblar base de datos
```

## Métricas de Calidad

- **Cobertura de pruebas**: > 30%
- **Principios SOLID**: Aplicados
- **Clean Code**: Implementado
- **TypeScript**: 100% tipado
- **Documentación**: Completa

## Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Estándares de Código
- Usar TypeScript estricto
- Seguir principios SOLID
- Escribir pruebas para nuevas funcionalidades
- Documentar cambios en la API
- Usar commits semánticos

## Licencia

Este proyecto está bajo la Licencia ISC. Ver el archivo `LICENSE` para más detalles.

## Autores

- **Juan Hernández** - *Desarrollo inicial* - [@Juandhm18](https://github.com/Juandhm18)

## Agradecimientos

- Equipo de desarrollo de RIWI
- Comunidad de Node.js y TypeScript
- Documentación de Express.js y Sequelize

---

**SportsLine Backend API** - Desarrollado con amor para la gestión eficiente de productos deportivos.