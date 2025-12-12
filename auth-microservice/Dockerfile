# ------------------------------------------------------------------------------------------------------
# STAGE 1: BASE IMAGE - Instalar Dependências (Cache)
# ------------------------------------------------------------------------------------------------------
FROM node:20-alpine AS base

WORKDIR /usr/src/app

# Copia package files primeiro para cache do Docker
COPY package*.json ./

# Instala as dependências, incluindo as de desenvolvimento (necessárias para o 'start:dev')
RUN npm install --legacy-peer-deps

# ------------------------------------------------------------------------------------------------------
# STAGE 2: BUILD - Compilar TypeScript
# ------------------------------------------------------------------------------------------------------
FROM base AS build

# Copia todos os arquivos de código-fonte e configuração para a compilação
COPY . .

# Executa o build (cria a pasta dist)
RUN npm run build

# ------------------------------------------------------------------------------------------------------
# STAGE 3: PRODUCTION - Ambiente de Execução Final
# Este estágio cria a imagem final, contendo apenas o necessário para rodar a aplicação.
# ------------------------------------------------------------------------------------------------------
FROM node:20-alpine AS production

WORKDIR /usr/src/app

# Copia as dependências de produção da imagem 'base'
COPY --from=base /usr/src/app/node_modules ./node_modules
COPY package*.json ./

# Copia os arquivos compilados da imagem 'build'
COPY --from=build /usr/src/app/dist ./dist

# Comando para iniciar a aplicação em modo de produção
CMD ["npm", "run", "start"]

# ------------------------------------------------------------------------------------------------------
# STAGE 4: DEVELOPMENT - Ambiente de Desenvolvimento
# ------------------------------------------------------------------------------------------------------
FROM node:20-alpine AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

CMD ["npm", "run", "start:dev"]
