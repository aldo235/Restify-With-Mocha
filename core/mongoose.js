"use strict";

var mongoose = require('mongoose');
var database = require('../config/database');
var models_path = process.cwd() + '/model';

// mongoose.Promise = global.Promise;
mongoose.connect(database.connection.mongodb(), {
  auto_reconnect: true,
  promiseLibrary: global.Promise,
  useNewUrlParser: true
});

var db = mongoose.connection;

db.on('error', function (err) {
  console.error('Restful-API server connection to MongoDB error:', err);
});

db.once('open', function callback() {
  console.info('Restful-API server establishing connection to MongoDB.');
});

db.on('disconnected', function () {
  console.error('Restful-API server disconnected from MongoDB.');
  mongoose.connect(process.env.MONGO_URL, {
    server: {
      auto_reconnect: true
    }
  });
});

db.on('reconnected', function () {
  console.info('Restful-API server reconnected to MongoDB.');
});


process.on('SIGINT', function () {
  mongoose.connection.close(function () {
    console.log('Restful-API server closing connection through app termination.');
    process.exit(0);
  });
});