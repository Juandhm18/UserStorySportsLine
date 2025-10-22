# 🚀 Configuración Supabase - SportsLine

## ⚡ Configuración en 3 pasos

### 1. Crear proyecto en Supabase
- Ir a: https://supabase.com
- Crear cuenta gratuita
- Crear nuevo proyecto
- Esperar a que se configure (2-3 minutos)

### 2. Obtener URI de conexión
- Ir a: **Settings** → **Database**
- Copiar la **Connection string** (URI)
- Formato: `postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres`

### 3. Configurar proyecto
```bash
# Editar el archivo .env
DATABASE_URL=postgresql://postgres:tu-contraseña@db.tu-proyecto.supabase.co:5432/postgres
```

### 4. Ejecutar proyecto
```bash
npm run dev
```

##  Verificación

Deberías ver:
```
Configurado para PostgreSQL con Supabase
Conexion a la base de datos exitosa
Modelos sincronizados con la base de datos
```

##  Ejemplo de URI

```env
DATABASE_URL=postgresql://postgres:abcdefghijklmnop@db.abcdefghijklmnop.supabase.co:5432/postgres
```

##  Importante

- **Reemplaza** `[YOUR-PASSWORD]` con tu contraseña real
- **Reemplaza** `[YOUR-PROJECT-REF]` con tu referencia de proyecto
- **No compartas** tu URI de conexión públicamente

## Si tienes problemas

1. **Error de conexión:** Verifica que la URI sea correcta
2. **Proyecto no encontrado:** Asegúrate de que el proyecto esté activo en Supabase
3. **Contraseña incorrecta:** Verifica la contraseña en Settings → Database
