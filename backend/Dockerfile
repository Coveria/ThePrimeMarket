# --- Base
FROM node:20-slim AS base

WORKDIR /app

RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install
RUN npx prisma generate

# --- Development
FROM base AS development

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:dev"]

# --- Builder
FROM base AS builder

COPY . .

RUN npm run build

# --- Production
FROM node:20-slim AS production

WORKDIR /app

RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./

EXPOSE 3000

CMD ["node", "dist/main"]