# 🎯 SportsLine - Opciones para Ejecutar con PostgreSQL

## ✅ Estado Actual

El proyecto está **funcionando correctamente** con SQLite como fallback automático.

## 🚀 Opciones Disponibles

### 1. **PostgreSQL Local (Recomendado para Producción)**

**Para configurar PostgreSQL cuando tengas permisos de administrador:**

```bash
# Opción A: Script automático
bash setup-postgresql.sh

# Opción B: Manual
sudo systemctl start postgresql
sudo -u postgres createdb sportsline_db
```

**Configuración en `.env`:**
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=sportsline_db
DB_USER=postgres
DB_PASSWORD=postgres
FORCE_SQLITE=false
```

### 2. **SQLite (Actual - Funcionando)**

**El proyecto ya está funcionando con SQLite:**

```bash
npm run dev
# ✅ Servidor corriendo en http://localhost:3000
```

**Configuración en `.env`:**
```env
FORCE_SQLITE=true
```

### 3. **Docker PostgreSQL (Si tienes permisos Docker)**

```bash
# Ejecutar solo PostgreSQL
docker-compose up -d db

# Verificar
docker ps | grep postgres
```

### 4. **PostgreSQL en la Nube**

**Opción para desarrollo sin configuración local:**

- **Neon** (gratis): https://neon.tech
- **Supabase** (gratis): https://supabase.com
- **Railway** (gratis): https://railway.app

**Configuración en `.env`:**
```env
DB_HOST=tu-host-de-la-nube
DB_PORT=5432
DB_NAME=tu-base-de-datos
DB_USER=tu-usuario
DB_PASSWORD=tu-contraseña
```

## 🔧 Configuración Inteligente

El proyecto ahora tiene **detección automática**:

1. **Intenta PostgreSQL** primero (si está configurado)
2. **Fallback a SQLite** si PostgreSQL no está disponible
3. **Mensaje claro** en consola sobre qué base de datos está usando

## 📋 Archivos Creados

- `setup-postgresql.sh` - Script para configurar PostgreSQL automáticamente
- `POSTGRESQL-SETUP.md` - Guía detallada de configuración
- `INSTRUCCIONES.md` - Guía general del proyecto

## 🎯 Recomendación

**Para desarrollo inmediato:** Usa SQLite (ya está funcionando)
**Para producción:** Configura PostgreSQL cuando tengas permisos

## ✅ Verificación

```bash
# El proyecto ya está funcionando
curl http://localhost:3000
# Respuesta: "Servidor corriendo con exito"

# Probar API
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"123","rol":"vendedor"}'
```

**¡El proyecto está completamente funcional!** 🎉
