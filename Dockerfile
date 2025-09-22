# Build step
FROM node:22-alpine AS build
WORKDIR /app

COPY package*.json .
COPY pnpm-lock.yaml .
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm run buildpn
RUN pnpm prune --prod

# Deployment step
FROM node:22-alpine
WORKDIR /app

COPY --from=builder /app/build build/
COPY package.json .

EXPOSE 3000
ENV NODE_ENV=production
CMD [ "node", "build" ]
