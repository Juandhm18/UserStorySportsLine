# Configuración PostgreSQL en la Nube - SportsLine

## Opción 1: Neon (Recomendado - Gratis)

1. **Crear cuenta en Neon:**
   - Ir a: https://neon.tech
   - Crear cuenta gratuita
   - Crear un nuevo proyecto

2. **Obtener credenciales:**
   - Copiar la connection string
   - O usar los datos individuales:
     - Host: tu-host.neon.tech
     - Puerto: 5432
     - Base de datos: tu-db-name
     - Usuario: tu-usuario
     - Contraseña: tu-contraseña

3. **Actualizar `.env`:**
```env
DB_HOST=tu-host.neon.tech
DB_PORT=5432
DB_NAME=tu-db-name
DB_USER=tu-usuario
DB_PASSWORD=tu-contraseña
```

## Opción 2: Supabase (Gratis)

1. **Crear cuenta en Supabase:**
   - Ir a: https://supabase.com
   - Crear cuenta gratuita
   - Crear un nuevo proyecto

2. **Obtener credenciales:**
   - Ir a Settings > Database
   - Copiar connection string

3. **Actualizar `.env`:**
```env
DB_HOST=db.tu-proyecto.supabase.co
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=tu-contraseña
```

## Opción 3: Railway (Gratis)

1. **Crear cuenta en Railway:**
   - Ir a: https://railway.app
   - Crear cuenta gratuita
   - Crear nuevo proyecto

2. **Agregar PostgreSQL:**
   - Add Service > Database > PostgreSQL

3. **Obtener credenciales:**
   - Copiar connection string

4. **Actualizar `.env`:**
```env
DB_HOST=containers-us-west-xxx.railway.app
DB_PORT=5432
DB_NAME=railway
DB_USER=postgres
DB_PASSWORD=tu-contraseña
```

## Configuración Local (Si tienes permisos)

Si tienes permisos de administrador:

```bash
# Instalar PostgreSQL
sudo apt update
sudo apt install postgresql postgresql-contrib

# Iniciar PostgreSQL
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Crear usuario y base de datos
sudo -u postgres psql
CREATE USER postgres WITH SUPERUSER PASSWORD 'postgres';
CREATE DATABASE sportsline_db OWNER postgres;
\q

# Actualizar .env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=sportsline_db
DB_USER=postgres
DB_PASSWORD=postgres
```

## Verificación

Una vez configurado, ejecutar:

```bash
npm run dev
```

Deberías ver:
```
Configurado para PostgreSQL
Conexion a la base de datos exitosa
Modelos sincronizados con la base de datos
```

## Solución de Problemas

### Error: "connection refused"
- **Causa:** PostgreSQL no está ejecutándose
- **Solución:** Usar PostgreSQL en la nube o iniciar PostgreSQL local

### Error: "authentication failed"
- **Causa:** Credenciales incorrectas
- **Solución:** Verificar usuario y contraseña en `.env`

### Error: "database does not exist"
- **Causa:** La base de datos no existe
- **Solución:** Crear la base de datos o verificar el nombre
