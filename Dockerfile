FROM emandere/forex-experiment-base AS builder
WORKDIR /app

COPY . ./
RUN npm install
RUN npm run build -- --output-path=/app/dist --configuration production

FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]