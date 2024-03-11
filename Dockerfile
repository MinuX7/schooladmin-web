FROM node:20-alpine AS build
COPY package.json package-lock.json ./
RUN npm ci && mkdir /web-app && cp -R ./node_modules ./web-app
WORKDIR /web-app

COPY . .
RUN npm install -g @angular/cli && ng build --configuration=kubernetes


# Serve Application using Nginx Server
FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /web-app/dist/schooladmin-web/browser /usr/share/nginx/html
EXPOSE 80