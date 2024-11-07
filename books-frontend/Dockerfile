FROM node:20.18-alpine as stage

WORKDIR /app

# ENV NODE_ENV=production

COPY package.json . 

RUN npm i

COPY . .

RUN npm run build

FROM nginx as production

WORKDIR /app

COPY --from=stage /app/dist/books-frontend/browser /var/www/bookexchange.com

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80