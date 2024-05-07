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
ENV PORT=3000
EXPOSE 3000
CMD [ "npx", "pnpm", "start" ]
