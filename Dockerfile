FROM nginx:alpine
COPY game/ /usr/share/nginx/html/
EXPOSE 80
