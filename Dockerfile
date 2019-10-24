FROM node:12.13.0-alpine
ENV SERVER_PORT=80
WORKDIR /app
ADD . .
RUN npm i
EXPOSE $SERVER_PORT
CMD [ "npm", "start" ]
