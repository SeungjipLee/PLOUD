FROM node:alpine AS builder
WORKDIR /frontend
COPY package.json .
RUN npm install react-scripts -g
RUN npm install

COPY ./ ./
RUN npm run build

FROM nginx
EXPOSE 80

COPY --from=builder /frontend/dist /var/www/html
COPY ./default.conf /etc/nginx/conf.d/default.conf