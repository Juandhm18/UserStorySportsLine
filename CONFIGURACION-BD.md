# Configuración de Base de Datos - SportsLine

## Configuración Actual: SQLite (Funcionando)

El proyecto está configurado para usar **SQLite por defecto** y funciona perfectamente.

## Para Cambiar a PostgreSQL

### Opción 1: PostgreSQL Local

1. **Configurar PostgreSQL:**
```bash
bash setup-postgresql.sh
```

2. **Actualizar `.env`:**
```env
# Comentar SQLite
# FORCE_SQLITE=true

# Descomentar PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_NAME=sportsline_db
DB_USER=postgres
DB_PASSWORD=postgres
```

3. **Reiniciar el servidor:**
```bash
npm run dev
```

### Opción 2: PostgreSQL en la Nube

1. **Crear cuenta en:**
   - Neon: https://neon.tech (gratis)
   - Supabase: https://supabase.com (gratis)
   - Railway: https://railway.app (gratis)

2. **Actualizar `.env` con credenciales de la nube:**
```env
DB_HOST=tu-host-de-la-nube
DB_PORT=5432
DB_NAME=tu-base-de-datos
DB_USER=tu-usuario
DB_PASSWORD=tu-contraseña
```

3. **Reiniciar el servidor:**
```bash
npm run dev
```

## Configuraciones Disponibles

### SQLite (Actual - Funcionando)
```env
FORCE_SQLITE=true
```

### PostgreSQL Local
```env
FORCE_SQLITE=false
DB_HOST=localhost
DB_PORT=5432
DB_NAME=sportsline_db
DB_USER=postgres
DB_PASSWORD=postgres
```

### PostgreSQL Remoto
```env
FORCE_SQLITE=false
DB_HOST=tu-host-remoto
DB_PORT=5432
DB_NAME=tu-base-de-datos
DB_USER=tu-usuario
DB_PASSWORD=tu-contraseña
```

## Verificación

```bash
# Verificar que funciona
curl http://localhost:3000
# Respuesta: "Servidor corriendo con exito"

# Probar API
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"123","rol":"vendedor"}'
```

## Estado Actual

✅ **Proyecto funcionando con SQLite**
✅ **API completamente operativa**
✅ **Fácil cambio a PostgreSQL cuando sea necesario**
✅ **Configuración flexible y robusta**
