FROM node:12.13.0-alpine
ARG PORT=80
WORKDIR /app
ADD . .
RUN npm i
EXPOSE PORT
CMD [ "npm", "start" ]
