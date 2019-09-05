import React from 'react'
import moment from 'moment';
import axios from 'axios';
import { useState } from 'react';
import { withRouter, RouterProps as router } from 'next/router'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

/** Universial components */
import { Head } from '../../../components';

/** Page specific components */
import TrackingUrlForm from './components/TrackingUrlForm'

/** Helpers **/
import { logger, absoluteUrl } from '../../../utils';

/** Styles **/
import './supplier.scss';


const Supplier = ({
	firstName,
	id,
	orders,
	router,
}) => {
	const [order, setOrder] = useState({
		user: {},
		shippingAddress: {}
	});

	// Hooks
	const handleOrder = (order) => setOrder(order)
	const [show, setShow] = useState(false);
	const handleClose = (args = {}) => {
		const { refreshData } = args;
		if (refreshData) {
			console.error('Refreshing data', router.asPath);
			router.push(router.asPath);
		}
		setShow(false)
	};
	const handleShow = () => setShow(true);
	const openModal = (order) => {
		setOrder(order);
		handleShow();
	}

	const supplierId = router.query.supplier_id;

	return (
		<div>
			<Head />
			<div>Welcome, {firstName} {id}</div>
			<p>Please track and update your orders here.</p>

			<ul className="Row">
				<li className="Column One">Date</li>
				<li className="Column Two">Status</li>
				<li className="Column Three">Invoice Id</li>
				<li className="Column Four">Token</li>
				<li className="Column Five">Tracking Information</li>
			</ul>

			{/* use react table */
				orders.map(order => {
					// We have to reset this value.
					// Its possible that another supplier from the same order has already shipped.
					// In the eyes of snipcart, this means the entire order has shipped.
					// We need to double check with metadata that we have set ourselves to be sure of the true status.
					// If no metadata exists, we can assume nothing has happened since purchase and the order,
					// does in fact, have a the status 'Processed'.
					order.status = 'Processed';


					if (order.metadata.orderSortedBySupplier && order.metadata.orderSortedBySupplier[supplierId]) {
						order.status = order.metadata.orderSortedBySupplier[supplierId].status;
					}

					return (
						<ul className="Row" key={order.invoiceNumber}>
							<li className="Column One">{moment(order.completionDate).format('ll')}</li>
							<li className="Column Two">{order.status}</li>
							<li className="Column Three">{order.invoiceNumber}</li>
							<li className="Column Four">{order.token}</li>
							<li className="Column Five">
								{
									order.status === 'Shipped' ?
										<Button
											variant="secondary"
											onClick={openModal.bind(null, order)}>
												View tracking information
										</Button>
										:
										<Button
											className=""
											variant="primary"
											onClick={openModal.bind(null, order)}>
												Add tracking information
										</Button>
								}
							</li>
						</ul>
					);
				})
			}

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>
						Tracking Information
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{
						order.status === 'Shipped' &&
						<div>
							<div>Tracking number: {order.metadata.orderSortedBySupplier[supplierId].trackingNumber}</div>
							<div>Tracking url: {order.metadata.orderSortedBySupplier[supplierId].trackingUrl}</div>
							<div>Shipping carrier: {order.metadata.orderSortedBySupplier[supplierId].metadata.shippingCarrier}</div>
						</div>
					}

					<div>
						Shipping information:
						<div>{order.shippingAddress.fullName}</div>
						<div>{order.shippingAddress.company}</div>
						<div>{order.shippingAddress.address1}</div>
						<div>{order.shippingAddress.address2}</div>
						<div>{order.shippingAddress.city}, {order.shippingAddress.province ? order.shippingAddress.province : ''} {order.shippingAddress.postalCode}</div>
						<div>{order.shippingAddress.country}</div>

						<div>{order.user.email}</div>


						{
							order.status !== 'Shipped' &&
								<TrackingUrlForm
									supplierId={supplierId}
									order={order}
									handleClose={handleClose}
								/>
						}

					</div>

					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>

				</Modal.Body>
			</Modal>

		</div>
	)
}

Supplier.getInitialProps = async function getInitialProps({ query, req }) {
	const { supplier_id } = query;
	const baseUrl = absoluteUrl(req, 'localhost:3000');
	try {
		logger.info(`Going to get orders: ${baseUrl}api/orders?supplier_id=${supplier_id}`);
		const response = await axios.get(`${baseUrl}api/orders?supplier_id=${supplier_id}`);
		const orders = response.data.data.items;

		return {
			firstName: 'Sara',
			id: supplier_id,
			orders,
		}
	} catch (error) {
		logger.error('There was an error getting suppliers orders', error);
		return {
			error: true,
		};
	}
}


Supplier.propTypes = {

};

Supplier.defaultProps = {

};

export default withRouter(Supplier);
