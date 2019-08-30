const logger = require('./logger');
const config = require('./env');
const mongoose = require('mongoose');

// Create cached connection variable
let cachedDb = null

// A function for connecting to MongoDB,
// taking a single paramater of the connection string
module.exports = async function connectToDatabase(uri) {
  // If the database connection is cached,
  // use it instead of creating a new connection
  if (cachedDb) {
    return cachedDb
  }

  // If no connection is cached, create a new one
  logger.info(`Connecting to ${config.db.url} mongo instance`);
  const db = await mongoose.connect(config.db.url, { useNewUrlParser: true });
  logger.info('Connected to db', db.connection.host);

  // Select the database through the connection,
  // using the database path of the connection string
  // const db = await client.db(url.parse(uri).pathname.substr(1))

  // Cache the database connection and return the connection
  cachedDb = db
  return db
};




/*
const colors = require('colors');

module.exports = function() {
    const options = {
        useNewUrlParser: true
    };


    mongoose.connect(config.db.url, options).then(
      err => { logger.warn('Unable to connect to mongoose?') }
    );

    const db = mongoose.connection;
    db.once('open', function() {
      logger.info('Successfully connected to mongoose'.green)
    });
};



// Import Dependencies
const url = require('url')
const mongoose = require('mongoose');
*/
