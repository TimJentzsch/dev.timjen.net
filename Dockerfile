# Build step
FROM node:22-alpine AS build
WORKDIR /app

COPY package*.json .
COPY pnpm-lock.yaml .
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm run build
RUN pnpm prune --prod

# Deployment step
FROM node:22-alpine
# <https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry#labelling-container-images>
LABEL org.opencontainers.image.source=https://github.com/TimJentzsch/dev.timjen.net
WORKDIR /app

COPY --from=build /app/build build/
COPY package.json .

EXPOSE 3000
ENV NODE_ENV=production
CMD [ "node", "build" ]
