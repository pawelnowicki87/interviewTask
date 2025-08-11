FROM node:20-alpine

RUN apk add --no-cache dumb-init netcat-openbsd

WORKDIR /usr/src/backend

COPY package*.json ./
RUN npm install --omit=dev --no-audit --no-fund

COPY . .

COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 8080

ENTRYPOINT ["dumb-init", "--"]
CMD ["sh", "/usr/local/bin/docker-entrypoint.sh"]
