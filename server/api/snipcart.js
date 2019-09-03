const base64 = require('base-64');
const axios = require('axios');
const config = require('../config');
const { logger, env } = config;


const { SNIPCART_API_KEY } = env;
const encodedString = base64.encode(`${SNIPCART_API_KEY}`);

// https://docs.snipcart.com/webhooks/introduction#secure-your-webhook-endpoint
// logger.info(req.headers['X-Snipcart-RequestToken']);
// https://app.snipcart.com/api/requestvalidation/{token}


const snipcart = axios.create({
  baseURL: 'https://app.snipcart.com/api/',
  headers: {
		'Authorization': `Basic ${encodedString}`
	}
});

module.exports = snipcart;
