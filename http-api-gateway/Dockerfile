# ------------------------------------------------------------------------------------------------------
# STAGE 1: BASE IMAGE - Instalar Dependências (Cache)
# Usamos node:18-alpine, conforme o log anterior.
# ------------------------------------------------------------------------------------------------------
FROM node:20-alpine AS base

WORKDIR /usr/src/app

# Copia package files primeiro para cache do Docker
COPY package*.json ./

# Instala as dependências, incluindo as de desenvolvimento (necessárias para o 'start:dev')
RUN npm install

# ------------------------------------------------------------------------------------------------------
# STAGE 2: BUILD - Compilar TypeScript
# ------------------------------------------------------------------------------------------------------
FROM base AS build

# Copia todos os arquivos de código-fonte e configuração para a compilação
COPY . .

# Executa o build (cria a pasta dist)
RUN npm run build

# ------------------------------------------------------------------------------------------------------
# STAGE 3: DEVELOPMENT - Ambiente de Execução em Desenvolvimento
# IMPORTANTE: Este estágio é usado pelo 'start:dev' e precisa dos arquivos de código-fonte (src/) 
# e configuração (tsconfig.json) para que o 'nest start --watch' funcione corretamente.
# ------------------------------------------------------------------------------------------------------
FROM base AS development

# Copia TODO o código-fonte, incluindo tsconfig.json, src/, e nest-cli.json.
COPY . .

# Não precisamos da pasta dist neste estágio, pois o 'nest start --watch' usa o código-fonte.
# Apenas a base com as dependências e o código-fonte são suficientes.