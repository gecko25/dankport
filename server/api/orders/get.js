const snipcart = require('../snipcart');
const config = require('../../config');
const { logger, transporter } = config;

const getOrders = async function getOrders(req, res) {
	logger.info(`Going to get supplier information for supplier: |${req.query.supplier_id}`);
	const requestedSupplierId = req.query.supplier_id;

	try {
		const response = await snipcart.get('/orders');
		logger.info('Successfuly received orders');

		const orders = response.data.items.map(order => {
			const filtered = order.items.filter(item => {
				let supplier_id;
				if (item.metadata && typeof item.metadata === 'object') {
					supplier_id = item.metadata.supplier_id;

				// Temporary as I entered some test data that was imperfect and dont know how to delete
				} else {
					try {
						const substring = item.metadata.substring(1, item.metadata.length - 1);
						supplier_id = JSON.parse(substring).supplier_id;
					} catch (e) {
						// TODO: if for some reason an item doesnt have a supplier id.... 
						// This is bad, this should never theoretically happen.
						supplier_id = null;
					}
				}
				return requestedSupplierId == supplier_id;
			});

			return {
				...order,
				items: filtered,
			}
		});

		const orders_filtered = orders.filter(order => order.items.length > 0);


		res.status(200).json({
			"success": true,
			"data": {
				...response.data,
				items: orders_filtered
			},
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
