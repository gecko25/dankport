const { logger } = require('../config');

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

module.exports = (req, res) => {
		let success = false;
		let status = 200;
		logger.info(req.headers['X-Snipcart-RequestToken']);
		// validate this token
		// https://app.snipcart.com/api/requestvalidation/{token}

		const event = req.body.eventName;
		logger.info(`Registering hook event: ${event}`);

		switch(event) {
			// Notification to send customer (Order Received)
		  case "order.completed":
		    logger.info('--- ORDER COMPLETED ---');
				success = true;
		    break;

			// Notification to send supplier (Order Received)
		  case "order.status.changed":
				logger.info('--- ORDER STATUS CHANGED ---');
				success = true;
		    // code block
		    break;

			// Notification to send customer the tracking number (Order shipped)
			case "order.trackingNumber.changed":
				logger.info('--- TRACKING NUMBER UPDATED ---');
				success = true;
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
