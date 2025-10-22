# Etapa base
FROM node:20-alpine AS base

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# Compila el código TypeScript
RUN npm run build

# Expone el puerto
EXPOSE 3000

# Comando por defecto
CMD ["npm", "run", "start"]
