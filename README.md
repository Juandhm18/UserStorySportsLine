# UserStorySportsLine
como desarrollador backend tengo la responsabilidad de configurar la base del proyecto con Node.js, Typescript y PostgreSQL para la empresa SportLine y asi garantizar un entorno estandarizado, versionado y listo para futuras integraciones.

## 1. Start the project and install dependencies

npm init -y

This creates a package.json file.

### 1.1. Main dependencies

npm install express sequelize sequelize-typescript pg pg-hstore bcrypt jsonwebtoken zod cors dotenv supertest cross-env sqlite3

### 1.2. Development dependencies

npm install --save-dev typescript ts-node-dev @types/express @types/node @types/jsonwebtoken @types/cors @types/bcrypt @types/sequelize @types/validator @types/dotenv @types/supertest

### 1.3. We initialize typescript

npx tsc --init
