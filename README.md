# nodejs-pwinty-proxy

A basic proxy to request the pwinty API (https://pwinty.com/ & https://www.prodigi.com/print-api/docs/) from a nodejs server

Everything relies in the postman sub-folder for proper API testing.

How to start the project using docker-compose: `docker-compose up` or `make up`

The default root URL is http://localhost:5000 and you can try http://localhost:5000/health as a beginning

Stop the project: `docker-compose down` or `make down`

You have to configure the env variables `PWINTY_MERCHANT_ID` and `PWINTY_API_KEY` for a proper run
