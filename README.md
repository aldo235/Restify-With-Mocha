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

``` bash
# Change database : server.config.js

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
    
# Change Port : server.js

let port = process.env.PORT || 8000;
port = (process.env.NODE_ENV === 'development') ? port : 8100;

```

## Setting Testing Env

``` bash
# Change database : config/database.js

/**
 * MongoDB Configuration for connection.
 * @return {string}
 */
function mongodb(){
    let dbConnection = 'mongodb';
    let NODE_ENV = process.env.NODE_ENV;
    if(NODE_ENV === 'development'){
        let DRIVER = getDriver(dbConnection) || 'mongodb',
		HOST = getHost(dbConnection) || 'localhost',
		PORT = getPort(dbConnection) || 27017,
		DATABASE = getDatabase(dbConnection) || '';
	    return `${DRIVER}://${HOST}:${PORT}/${DATABASE}`;
    }else{
        return 'mongodb://localhost:27017/restful_testing';
    }
}

# Script running testing : package.json

  "scripts": {
    "start": "node server.js"
  },

#folder testing 
create folder testing in main folder and create your own file testing
in here i use user.js

```

## Example File Testing

``` bash
# /GET User
    /*
     * Test the /GET route
     */
    describe('/GET User', () => {
        it('it should GET all the users active', (done) => {
            chai.request(server)
                .get('/v1/users')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('result');
                    res.body.should.have.property('status').eql('RESULT_EMPTY');
                    res.body.result.should.be.a('array');
                    res.body.result.length.should.be.eql(0);
                    done();
                });
        });
    });

```
