FROM node:16-alpine3.12

COPY . /

RUN npm install

EXPOSE 8000

CMD [ "node", "server.js" ]