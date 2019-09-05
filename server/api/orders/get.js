const snipcart = require('../snipcart');
const config = require('../../config');
const { logger } = config;
const { getSupplierId } = require('../../helpers');

const getOrders = async function getOrders(req, res) {
	logger.info(`Going to get supplier information for supplier: ${req.query.supplier_id}`);
	const requested_supplier_id = req.query.supplier_id;

	try {
		const response = await snipcart.get('/orders');
		logger.info('Successfuly received orders');

		const orders = response.data.items.map(order => {
			const filtered = order.items.filter(item => {
				const supplier_id_on_order = getSupplierId(item.metadata)
				return requested_supplier_id == supplier_id_on_order;
			});

			return {
				...order,
				items: filtered,
			}
		}).filter(order => order.items.length > 0);


		res.status(200).json({
			"success": true,
			"data": {
				...response.data,
				items: orders,
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
