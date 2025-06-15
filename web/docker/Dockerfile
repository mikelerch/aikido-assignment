FROM node:22-alpine AS builder

WORKDIR /app
COPY package*json tsconfig*json index.html vite.config.ts .env ./
COPY ./src ./src

RUN npm ci
RUN npm run build

FROM nginx:alpine AS runner
WORKDIR /usr/share/nginx/html

COPY --from=builder /app/dist .
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]