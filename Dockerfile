# Етап 1: Збірка Angular застосунку
FROM node:20 AS build

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build --prod

# Етап 2: Nginx для продакшн-серву статичних файлів
FROM nginx:1.27

# Видаляємо дефолтну сторінку
RUN rm -rf /usr/share/nginx/html/*

# Копіюємо зібраний Angular
COPY --from=build /app/dist/iot-manager/browser /usr/share/nginx/html

EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]
#COPY src/assets/config.template.json /usr/share/nginx/html/assets/config.template.json
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
