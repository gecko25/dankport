const base64 = require('base-64');
const axios = require('axios');
const config = require('../../config');
const { logger, env } = config;

const getOrders = async function getOrders(req, res) {
	const { SNIPCART_API_KEY } = env;
	const encodedString = base64.encode(`${SNIPCART_API_KEY}`);

	logger.info(`Going to update tracking information`);

	const {
		tracking_number,
		tracking_url,
		shipping_carrier,
		token,
	} = req.body;

	const data = {
		status: 'Shipped',
		trackingNumber: tracking_number,
		trackingUrl: tracking_url,
		metaData: {
			shippingCarrier: shipping_carrier,
		}
	};

	logger.info(`Going update order as shipped: PUT https://app.snipcart.com/api/orders/${token}`);

	try {
		const response = await axios.put(`https://app.snipcart.com/api/orders/${token}`,
			data,
			{ headers: { 'Authorization': `Basic ${encodedString}` }},
		);

		logger.info('Successfuly updated order');

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
