# ------------------------------------------------------------------------------------------------------
# STAGE 1: BASE IMAGE - Install dependencies (cache)
# ------------------------------------------------------------------------------------------------------
FROM node:20-alpine AS base

WORKDIR /usr/src/app

# Copy package files first for Docker layer caching
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# ------------------------------------------------------------------------------------------------------
# STAGE 2: BUILD - Compile TypeScript
# ------------------------------------------------------------------------------------------------------
FROM base AS build

# Copy source files
COPY . .

# Build
RUN npm run build

# ------------------------------------------------------------------------------------------------------
# STAGE 3: PRODUCTION - Final runtime image
# ------------------------------------------------------------------------------------------------------
FROM node:20-alpine AS production

WORKDIR /usr/src/app

# Copy production node_modules from base
COPY --from=base /usr/src/app/node_modules ./node_modules
COPY package*.json ./

# Copy compiled files
COPY --from=build /usr/src/app/dist ./dist

CMD ["npm", "run", "start"]

# ------------------------------------------------------------------------------------------------------
# STAGE 4: DEVELOPMENT - Dev image used by docker-compose for live reload
# ------------------------------------------------------------------------------------------------------
FROM node:20-alpine AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

CMD ["npm", "run", "start:dev"]

# ------------------------------------------------------------------------------------------------------
# STAGE 3: DEVELOPMENT - Ambiente de Execução em Desenvolvimento
# IMPORTANTE: Este estágio é usado pelo 'start:dev' e precisa dos arquivos de código-fonte (src/) 
# e configuração (tsconfig.json) para que o 'nest start --watch' funcione corretamente.
# ------------------------------------------------------------------------------------------------------
FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

CMD ["npm", "run", "start:dev"]
