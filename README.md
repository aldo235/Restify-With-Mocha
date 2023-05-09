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

``` bash
# Install Gcloud CLI
./google-cloud-sdk/install.sh

# Setup gcloud 
./google-cloud-sdk/bin/gcloud init
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

``` bash
# /Post User
    /*
     * Test the /POST route
     */
    describe('/Post User', () => {
        it('it should post a new user', (done) => {
            let newUser = {
                username : 'aldo235',
                email : 'aldo.abellto14@gmail.com',
                name : 'aldo',
                age : 22,
                password : '1234567890',
                confirm_password : '1234567890'
            };
            chai.request(server)
                .post('/v1/users')
                .send(newUser)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('User successfully Created');
                    res.body.should.have.property('status').eql('RESULT_OK');
                    done();
                });
        });
    });

```

``` bash
# /GET/:id User
    /*
     * Test the /Get/:id route
     */
    describe('/GET User/:id', () => {
        it('it should GET details from users given the id', (done) => {
            let newUser = new User({
                username : 'aldo2356',
                email : 'aldo.abellto124@gmail.com',
                name : 'aldo',
                age : 22,
                password : md5('1234567890')
            });
            newUser.save((err,user) => {
                chai.request(server)
                    .get('/v1/users/'+user.id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('result');
                        res.body.should.have.property('status').eql('RESULT_OK');
                        res.body.result.should.be.a('object');
                        done();
                    });
            });

        });
    });

```

``` bash
# /PUT/:id User
    /*
     * Test the /PUT/:id route
     */
    describe('/Put User/:id', () => {
        it('it should update a user given the id', (done) => {
            let newUser = new User({
                username : 'aldo235',
                email : 'aldo.abellto14@gmail.com',
                name : 'aldo',
                age : 22,
                password : '1234567890',
                confirm_password : '1234567890'
            });
            let updateUser = {
                email : 'aldo.abellto14@gmail.com',
                name : 'aldo',
                age : 19,
            }
            newUser.save((err,user) => {
                chai.request(server)
                    .put('/v1/users/'+user.id)
                    .send(updateUser)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('User successfully Updated');
                        res.body.should.have.property('status').eql('RESULT_OK');
                        res.body.should.have.property('result').should.be.a('object');
                        res.body.result.should.have.property('age').eql(19);
                        done();
                    });
            })
        });
    });

```

``` bash
# /Del/:id User
    /*
     * Test the /Del/:id route
     */
    describe('/Del User/:id', () => {
        it('it should softdelete a user given the id', (done) => {
            let newUser = new User({
                username : 'aldo2356',
                email : 'aldo.abellto1241@gmail.com',
                name : 'aldo',
                age : 22,
                password : md5('1234567890')
            });
            newUser.save((err,user) => {
                chai.request(server)
                    .del('/v1/users/'+user.id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('result');
                        res.body.should.have.property('status').eql('RESULT_OK');
                        res.body.result.should.be.a('object');
                        done();
                    });
            });
        });
    });

```
