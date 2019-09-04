const snipcart = require('../snipcart');
const config = require('../../config');
const { logger } = config;

const putOrders = async function putOrders(req, res) {
	logger.info(`Going to update tracking information`);

	const {
		tracking_number,
		tracking_url,
		shipping_carrier,
		supplier_id,
		order,
	} = req.body;

	const data = {
		status: 'Shipped',
		trackingNumber: tracking_number,
		trackingUrl: tracking_url,
		metaData: {
			orderSortedBySupplier: {
				...order.metadata.orderSortedBySupplier,
				[supplier_id]: {
					trackingNumber: tracking_number,
					trackingUrl: tracking_url,
					shippingCarrier: shipping_carrier,
					status: 'Shipped',
					items: order.items,
				},
			}
		}
	};

	logger.info(`Going update order as shipped: PUT https://app.snipcart.com/api/orders/${order.token}`);


	try {
		const response = await snipcart.put(`/orders/${order.token}`, data);
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

module.exports = putOrders;
