const base64 = require('base-64');
const axios = require('axios');
const config = require('../config');
const database = require('../mock-database');
const { logger, env, transporter } = config;
const snipcart = require('./snipcart');
const { getSupplierId, sortItemsBySupplier } = require('../helpers');
const { renderEmail } = require('../emails');

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
		let success = true;

		const {
			shippingAddress,
			eventName,
			invoiceNumber,
		} = req.body;

		const { token, metadata, items } = req.body.content;
		logger.info(`Registering hook event: ${eventName}`);
		logger.info(`Registering token event: ${token}`);

		switch(eventName) {
		  case "order.completed":
		    logger.info('--- ORDER COMPLETED ---');
				// Send out email to suppliers.
				// Snipcart will not handle communication with suppliers, just our customers.
				const itemsSortedBySupplier = sortItemsBySupplier(items);
				const suppliers = Object.keys(itemsSortedBySupplier);

				for (let i=0; i<suppliers.length; i++) {
					const supplierId = suppliers[i];
					logger.info('Order placed, going to get email for supplier id:', supplierId);
					const supplierEmail = database.suppliers[supplierId].email;

					logger.info(`Received the suppliers email ${supplierEmail}`);
					logger.info('Formulating email with information on order.');
					const data = {
						order: {
							...req.body.content,
							items: itemsSortedBySupplier[supplierId],
						},
						context: 'Email',
					}

					logger.info(`Going to send email to supplier ${supplierId} at ${supplierEmail}`);
					try {
						const html = await renderEmail('notify-supplier.hbs', data);
						try {
							let info = await transporter.sendMail({
									from: "Sara 👻", // sender address
									to: supplierEmail, // list of receivers
									subject: 'An order has been placed ✔', // Subject line
									html: html // html body
							});
							logger.info('Message sent: %s', info.messageId);
						} catch (error) {
							logger.info(error);
							success = false;
						}

					} catch (error) {
						// TODO: setup errors@dankport.com (?)
						logger.error(`Unable to send confirmation email to: ${supplierEmail}`, error);
						success = false;
					}
				}
		    break;

			// The tracking number was changed.
			// Send customer the tracking number (Order shipped)
			case "order.trackingNumber.changed":
				logger.info('--- TRACKING NUMBER UPDATED ---');
				success = true;

				const data = {
					message: "This is a test",
					type: "TrackingNumber",
					deliveryMethod: "Email"
				};

				try {
					const response = await snipcart.post(`/orders/${token}/notifications`, data);
					logger.info("Successfully sent tracking number email", response.data.id)
				} catch (error) {
					logger.error(`Error sending tracking number confirmation email:`, error);
					success = false;
				}
				break;

		  default:
				logger.info('--- UNKNOWN HOOK ---');
				success = false;
		}

		status = success ? 200 : 400;
		res.status(status).json({
			success,
			response: req.body,
		});
}
