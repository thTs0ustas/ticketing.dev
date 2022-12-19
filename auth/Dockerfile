FROM node:16-alpine3.17

WORKDIR /app

COPY package.json .

RUN npm install pnpm -g
RUN pnpm install

COPY . .

CMD ["pnpm", "start"]