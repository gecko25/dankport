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
			console.error('Refreshing data', router.pathname);
			router.push(router.pathname);
		}
		setShow(false)
	};
	const handleShow = () => setShow(true);
	const openModal = (order) => {
		setOrder(order);
		handleShow();
	}

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
				orders.map(order => (
					<ul className="Row" key={order.invoiceNumber}>
						<li className="Column One">{moment(order.completionDate).format('ll')}</li>
						<li className="Column Two">{order.status}</li>
						<li className="Column Three">{order.invoiceNumber}</li>
						<li className="Column Four">{order.token}</li>
						<li className="Column Five">
							{
								order.trackingNumber ?
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
				))
			}

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>
						Tracking Information
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{
						order.trackingNumber &&
						<div>
							<div>Tracking number: {order.trackingNumber}</div>
							<div>Tracking url: {order.trackingUrl}</div>
							<div>Shipping carrier: {order.metadata.shippingCarrier}</div>
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
							!order.trackingNumber &&
								<TrackingUrlForm token={order.token} handleClose={handleClose} />
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
		logger.info(`Going to get orders for supplier_id: ${baseUrl}api/orders?supplier_id=${supplier_id}`);
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
