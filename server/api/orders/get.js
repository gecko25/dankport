const base64 = require('base-64');
const axios = require('axios');
const config = require('../../config');
const { logger, env } = config;

const getOrders = async function getOrders(req, res) {
	const { SNIPCART_API_KEY } = env;
	const encodedString = base64.encode(`${SNIPCART_API_KEY}`);

	logger.info(`Going to get supplier information for supplier: |${req.query.supplier_id}| (encoded: |${encodedString}|)`);


	try {
		const response = await axios.get('https://app.snipcart.com/api/orders', {
			headers: { 'Authorization': `Basic ${encodedString}` },
		});

		logger.info('Successfuly received orders');

		res.status(200).json({
			"success": true,
			"data": response.data,
		});
	} catch (error) {

		logger.error(`Error goinng to get supplier information for supplier:`, error);

		res.status(400).json({
			"success": false,
			"data": {},
		});
	}
};

module.exports = getOrders;
