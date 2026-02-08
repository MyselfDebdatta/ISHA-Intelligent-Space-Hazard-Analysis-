FROM node:18-bullseye

WORKDIR /app

# Install backend
COPY backend/package*.json ./backend/
RUN cd backend && npm install
COPY backend ./backend

# Install nginx for frontend
RUN apt-get update && apt-get install -y nginx
COPY frontend /usr/share/nginx/html

EXPOSE 80

CMD nginx && node backend/server.js
