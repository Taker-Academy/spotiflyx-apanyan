FROM node:alpine AS build

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install

COPY . .

RUN pnpm build

FROM node:alpine AS runtime

WORKDIR /app

COPY --from=build /app .

ENV HOST=0.0.0.0
ENV PORT=2096
EXPOSE 2096
CMD [ "npx", "pnpm", "start" ]
