# ─────────────────────────────────────────────────────────────────────────────
# Multi-stage build : ce Dockerfile utilise deux stages distincts.
# Stage 1 (builder) : installe toutes les dépendances (y compris dev) et
# exécute les tests. Il ne sera jamais embarqué en production.
# Stage 2 (production) : repart d'une image alpine vierge et ne copie que
# le strict nécessaire. Résultat : image finale légère et sans outils de dev,
# ce qui réduit la surface d'attaque et la taille de l'image.
# ─────────────────────────────────────────────────────────────────────────────

# ── Stage 1 : build & test ──
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm test

# ── Stage 2 : production ──
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/server.js .

EXPOSE 3000

CMD ["node", "server.js"]
