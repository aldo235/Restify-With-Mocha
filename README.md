# Restify-With-Mocha

> Simple Restful API with restify.js and also testing using mocha testing

## Build Setup

``` bash
# install dependencies
npm install

# install pm2 for development
npm install -g pm2

# Runing with pm2
pm2 start server.config.js

# Runing testing
npm test
```
## Setting ENV Development

> Edit file server.config.js
``` bash
    env: {
      "NODE_ENV": "development",
      "APP_ID": "Restful-Api",
      "APP_KEY": "e10adc3949ba59abbe56e057f20f883e",
      "DB_CONNECTION": {
        "mongodb": {
          "driver": 'mongodb',
          "host": 'localhost',
          "port": 27017,
          "database": 'restful'
        }
      }
    }
```
