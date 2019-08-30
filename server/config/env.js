/**
 * Template taken from : https://github.com/pblair12/mosaic-groups/blob/master/server/config/config.js
 */
const env = process.env.NODE_ENV || 'development';
const localport = 3000;

const envs = {
  development: {
    db: {
        url: `mongodb+srv://sara:${process.env.MONGO_PASSWORD_LOCAL}@cluster0-5xtmz.mongodb.net/test?retryWrites=true&w=majority`,
    },
		SNIPCART_API_KEY: process.env.SNIPCART_API_KEY_TEST,
  },
  production: {
    db: {
        url: `mongodb+srv://sara:${process.env.MONGO_PASSWORD_PROD}@cluster0-9wq1y.mongodb.net/test?retryWrites=true&w=majority`,
    },
		SNIPCART_API_KEY: process.env.SNIPCART_API_KEY_PROD,
  },
}

module.exports = envs[env];
