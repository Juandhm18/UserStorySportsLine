# Configuración de PostgreSQL para SportsLine

## Opción 1: Usar el Script Automático (Recomendado)

```bash
# Ejecutar el script de configuración
bash setup-postgresql.sh
```

## Opción 2: Configuración Manual

### Paso 1: Instalar PostgreSQL

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
```

**macOS:**
```bash
brew install postgresql
```

### Paso 2: Iniciar PostgreSQL

**Ubuntu/Debian:**
```bash
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

**macOS:**
```bash
brew services start postgresql
```

### Paso 3: Configurar Usuario y Base de Datos

```bash
# Acceder a PostgreSQL como superusuario
sudo -u postgres psql

# En la consola de PostgreSQL:
CREATE USER postgres WITH SUPERUSER PASSWORD 'postgres';
CREATE DATABASE sportsline_db OWNER postgres;
\q
```

### Paso 4: Verificar la Configuración

```bash
# Probar conexión
psql -h localhost -U postgres -d sportsline_db -c "SELECT 1;"
```

## Opción 3: Usar Docker (Si tienes permisos)

```bash
# Ejecutar solo PostgreSQL con Docker Compose
docker-compose up -d db

# Verificar que esté ejecutándose
docker ps | grep postgres
```

## Opción 4: Usar SQLite (Desarrollo Rápido)

Si no puedes configurar PostgreSQL, puedes usar SQLite:

```bash
# Editar .env y agregar:
FORCE_SQLITE=true

# Ejecutar el proyecto
npm run dev
```

## Verificación

Una vez configurado PostgreSQL, ejecuta:

```bash
npm run dev
```

Deberías ver en la consola:
```
Configurado para PostgreSQL
Conexion a la base de datos exitosa
Modelos sincronizados con la base de datos
```

## Solución de Problemas

### Error: "connection refused"
- **Causa:** PostgreSQL no está ejecutándose
- **Solución:** Iniciar PostgreSQL con `sudo systemctl start postgresql`

### Error: "database does not exist"
- **Causa:** La base de datos no existe
- **Solución:** Crear la base de datos con `sudo -u postgres createdb sportsline_db`

### Error: "authentication failed"
- **Causa:** Credenciales incorrectas
- **Solución:** Verificar usuario y contraseña en `.env`

### Error: "permission denied"
- **Causa:** Falta de permisos
- **Solución:** Usar `sudo` para comandos administrativos

## Configuración del Archivo .env

```env
# PostgreSQL Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=sportsline_db
DB_USER=postgres
DB_PASSWORD=postgres

# Para usar SQLite en su lugar
FORCE_SQLITE=false
```

## Comandos Útiles

```bash
# Verificar estado de PostgreSQL
sudo systemctl status postgresql

# Reiniciar PostgreSQL
sudo systemctl restart postgresql

# Ver logs de PostgreSQL
sudo journalctl -u postgresql

# Conectar a la base de datos
psql -h localhost -U postgres -d sportsline_db

# Listar bases de datos
psql -h localhost -U postgres -c "\l"

# Listar usuarios
psql -h localhost -U postgres -c "\du"
```
