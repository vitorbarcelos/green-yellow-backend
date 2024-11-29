# Package Install
FROM node:lts-slim as package

WORKDIR /app
RUN apt update
RUN apt install procps -y

COPY package*.json ./
COPY *.lock ./
RUN yarn

# Development
FROM package as dev

EXPOSE 3333
ENV NODE_ENV=development
CMD ["yarn", "start:dev"]

# Production Build
FROM package as build

COPY src ./src
COPY nest-cli.json ./
COPY tsconfig.json ./
COPY tsconfig.build.json ./
RUN yarn build
RUN rm -r ./src

# Production
FROM build as prod
ENV NODE_ENV=production

EXPOSE 3333
CMD ["yarn", "start:prod"]
