FROM node:18-alpine
ENV NODE_ENV=production

RUN apk update
RUN apk add --no-cache make gcc g++ libc6-compat bash python3

WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

RUN npm install --production --silent # && mv node_modules ../
COPY . .
EXPOSE 6060
RUN chown -R node /usr/src/app
USER node
CMD ["node", "backend.js"]
