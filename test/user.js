process.env.NODE_ENV = 'test';
let md5 = require('md5');
let User = require('../models/User');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('User', () => {
    beforeEach((done) => { //Before each test we empty the database
        User.remove({}, (err) => {
            done();
        });
    });
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
    /*
     * Test the /POST route
     */
    describe('/Post User', () => {
        it('it should post a new user with a password and confirm password is not match ', (done) => {
            let newUser = {
                username : 'aldo235',
                email : 'aldo.abellto14@gmail.com',
                name : 'aldo',
                age : 22,
                password : 'majorbotak',
                confirm_password : '123456'
            };
            chai.request(server)
                .post('/v1/users')
                .send(newUser)
                .end((err, res) => {
                    res.should.have.status(417);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Password not match');
                    res.body.should.have.property('status').eql('error_confirm');
                    done();
                });
        });
    });
    describe('/Post User', () => {
        it('it should post a new user without username ', (done) => {
            let newUser = {
                email : 'aldo.abellto14@gmail.com',
                name : 'aldo',
                age : 22,
                password : 'majorbotak',
                confirm_password : 'majorbotak'
            };
            chai.request(server)
                .post('/v1/users')
                .send(newUser)
                .end((err, res) => {
                    res.should.have.status(417);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('User failed to Create');
                    res.body.should.have.property('status').eql('ERROR');
                    res.body.should.have.property('errors').should.be.a('object');
                    res.body.errors.should.have.property('username').should.be.a('object');
                    res.body.errors.username.should.have.property('message').eql('Path `username` is required.');
                    done();
                });
        });
    });
    describe('/Post User', () => {
        it('it should post a new user', (done) => {
            let newUser = {
                username : 'aldo235',
                email : 'aldo.abellto14@gmail.com',
                name : 'aldo',
                age : 22,
                password : 'majorbotak',
                confirm_password : 'majorbotak'
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
    /*
     * Test the /GET/:id route
     */
    describe('/GET User/:id', () => {
        it('it should GET details from users given the id', (done) => {
            let newUser = new User({
                username : 'aldo2356',
                email : 'aldo.abellto124@gmail.com',
                name : 'aldo',
                age : 22,
                password : md5('majorbotak')
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
                password : 'majorbotak',
                confirm_password : 'majorbotak'
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
    /*
     * Test the /DELETE/:id route
     */
    describe('/Delete User/:id', () => {
        it('it should softdelete a user given the id', (done) => {
            let newUser = new User({
                username : 'aldo2356',
                email : 'aldo.abellto1241@gmail.com',
                name : 'aldo',
                age : 22,
                password : md5('majorbotak')
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
});