FROM node:18-bullseye

WORKDIR /app

# Backend install
COPY backend/package*.json ./backend/
RUN cd backend && npm install
COPY backend ./backend

# Frontend static serve
RUN apt-get update && apt-get install -y nginx
COPY frontend /usr/share/nginx/html

EXPOSE 8080

CMD nginx && node backend/server.js

