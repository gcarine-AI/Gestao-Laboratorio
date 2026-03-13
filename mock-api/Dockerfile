FROM node:20-alpine
RUN npm install -g json-server
WORKDIR /data
COPY db.json .
EXPOSE 3000
CMD ["json-server", "--watch", "db.json", "--host", "0.0.0.0", "--port", "3000"]
