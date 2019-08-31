const base64 = require('base-64');
const axios = require('axios');
const config = require('../config');
const database = require('../mock-database');
const { logger, env } = config;
/*
 * This module is solely responsible for sending out emails.
 *
 * We are using hooks to send emails. (https://docs.snipcart.com/webhooks/order-events)
 * When something happens (order is placed, tracking number updated),
 * we make a PUT request to the snipcart API to update their database. (https://docs.snipcart.com/api-reference/orders#put-orders-token)
 * This change, in turn, fires off a notifcation (hook) that we can leverage.
 *
 * Example:
 * A supplier ships their product.
 * They login and submit the tracking number and tracking url.
 * We make an POST to snipcart to update the order with the tracking number and url. (https://docs.snipcart.com/api-reference/notifications#post-orders-token-notifications)
 * Snipcart, then, makes a POST to us letting us know the tracking number changed.
 * We, then, tell snipcart to send the tracking number email. (https://docs.snipcart.com/api-reference/orders#put-orders-token)
 */

module.exports = async (req, res) => {
		let success = false;
		let status = 200;
		logger.info(req.headers['X-Snipcart-RequestToken']);
		// validate this token
		// https://app.snipcart.com/api/requestvalidation/{token}

		const eventName = req.body.eventName;
		const { token, metadata } = req.body.content;

		logger.info(`Registering hook event: ${eventName}`);
		logger.info(`Registering token event: ${token}`);

		switch(eventName) {
			// Notification to send customer (Order Received)
			// We have just received and order.
			// An confirmation email is automatically sent to the customer
			// We need to send an email to the suppler
		  case "order.completed":
		    logger.info('--- ORDER COMPLETED ---');
				success = true;

				// Todo: send out email programmatically here.
				// Snipcart will not handle communication with suppliers, just our customers.
				const supplierEmail = database.suppliers[metadata.supplier_id];

		    break;

			// The tracking number was changed.
			// Send customer the tracking number (Order shipped)
			case "order.trackingNumber.changed":
				logger.info('--- TRACKING NUMBER UPDATED ---');
				success = true;

				try {
					const response = await axios.post(`https://app.snipcart.com/api/orders/${token}/notifications`, {
						headers: { 'Authorization': `Basic ${encodedString}` },
						data: {
							"message":"This is a test",
							"type":"TrackingNumber",
							"deliveryMethod":"Email"
						}
					});

					logger.info("Successfully sent tracking number email", response.data)
					res.status(200).json({
						"success": true,
						"data": response.data,
					});
				} catch (error) {

					logger.error(`Error getting tracking number email:`, error);

					res.status(400).json({
						"success": false,
						"data": {},
					});
				}

				break;

			case "customauth:customer_updated":
				logger.info('--- CUSTOMER UPDATED ---');
				logger.info(req.body);
				success = true;
				break;
		  default:
				logger.info('--- UNKNOWN HOOK ---');
				success = false;
				status = 400;
		}

		res.status(status).json({
			"success": success,
			"response": req.body,
		});
}
