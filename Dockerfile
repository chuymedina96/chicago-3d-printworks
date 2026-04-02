FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci --production=false

COPY . .

ARG REACT_APP_API_BASE=http://localhost:8000
ARG REACT_APP_DATA_UPLOAD_MAX_MB=200
ENV REACT_APP_API_BASE=$REACT_APP_API_BASE
ENV REACT_APP_DATA_UPLOAD_MAX_MB=$REACT_APP_DATA_UPLOAD_MAX_MB

RUN npm run build

# ── Production stage ──────────────────────────────────────────────
FROM node:22-alpine

WORKDIR /app

COPY --from=build /app/build ./build
COPY --from=build /app/server.js .
COPY --from=build /app/package*.json .

RUN npm ci --omit=dev

EXPOSE 3000

CMD ["node", "server.js"]
