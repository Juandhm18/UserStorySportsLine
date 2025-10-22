#!/bin/bash

# Script para configurar PostgreSQL para SportsLine
# Ejecutar con: bash setup-postgresql.sh

echo "🚀 Configurando PostgreSQL para SportsLine..."

# Verificar si PostgreSQL está instalado
if ! command -v psql &> /dev/null; then
    echo "❌ PostgreSQL no está instalado"
    echo "📦 Instalando PostgreSQL..."
    
    # Detectar el sistema operativo
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Ubuntu/Debian
        sudo apt update
        sudo apt install -y postgresql postgresql-contrib
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        brew install postgresql
    else
        echo "❌ Sistema operativo no soportado"
        exit 1
    fi
fi

# Verificar si PostgreSQL está ejecutándose
if ! pg_isready -h localhost -p 5432 &> /dev/null; then
    echo "🔄 Iniciando PostgreSQL..."
    
    # Intentar diferentes métodos para iniciar PostgreSQL
    if command -v systemctl &> /dev/null; then
        sudo systemctl start postgresql
        sudo systemctl enable postgresql
    elif command -v service &> /dev/null; then
        sudo service postgresql start
    elif command -v brew &> /dev/null; then
        brew services start postgresql
    else
        echo "❌ No se pudo iniciar PostgreSQL automáticamente"
        echo "📝 Inicia PostgreSQL manualmente y ejecuta este script nuevamente"
        exit 1
    fi
fi

# Esperar a que PostgreSQL esté listo
echo "⏳ Esperando a que PostgreSQL esté listo..."
sleep 3

# Crear usuario y base de datos
echo "👤 Configurando usuario y base de datos..."

# Crear usuario postgres si no existe
sudo -u postgres psql -c "CREATE USER postgres WITH SUPERUSER PASSWORD 'postgres';" 2>/dev/null || echo "Usuario postgres ya existe"

# Crear base de datos
sudo -u postgres psql -c "CREATE DATABASE sportsline_db OWNER postgres;" 2>/dev/null || echo "Base de datos sportsline_db ya existe"

# Verificar conexión
echo "🔍 Verificando conexión..."
if psql -h localhost -U postgres -d sportsline_db -c "SELECT 1;" &> /dev/null; then
    echo "✅ PostgreSQL configurado correctamente!"
    echo ""
    echo "📋 Configuración:"
    echo "   Host: localhost"
    echo "   Puerto: 5432"
    echo "   Base de datos: sportsline_db"
    echo "   Usuario: postgres"
    echo "   Contraseña: postgres"
    echo ""
    echo "🚀 Ahora puedes ejecutar: npm run dev"
else
    echo "❌ Error al conectar con PostgreSQL"
    echo "📝 Verifica la configuración manualmente"
fi
