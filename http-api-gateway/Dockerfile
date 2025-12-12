# ------------------------------------------------------------------------------------------------------
# STAGE 1: BASE IMAGE - Instalar Dependências (Cache)
# ------------------------------------------------------------------------------------------------------
FROM node:20-alpine AS base

WORKDIR /usr/src/app

# Copia package files primeiro para cache do Docker
COPY package*.json ./

# Instala TODAS as dependências (incluindo devDependencies)
RUN npm install --legacy-peer-deps

# ------------------------------------------------------------------------------------------------------
# STAGE 2: DEVELOPMENT - Ambiente de Execução em Desenvolvimento
# ------------------------------------------------------------------------------------------------------
FROM base AS development

WORKDIR /usr/src/app

# Copia TODO o código-fonte
COPY . .

# Instala dependências novamente para garantir que tudo está presente
RUN npm install --legacy-peer-deps

CMD ["npm", "run", "start:dev"]