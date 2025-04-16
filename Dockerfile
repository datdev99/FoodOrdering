FROM node:22.13.1-alpine3.21

# Tạo user non-root
RUN addgroup app && adduser -S -G app app

WORKDIR /app

RUN chmod -R 777 /app

COPY package*.json ./

RUN npm install

COPY . .

# Nếu dùng Vite global:
# RUN npm install -g vite

# Chạy với quyền của user app
USER app

# Expose Vite port
EXPOSE 5173

CMD [ "npm", "run", "dev" ]
