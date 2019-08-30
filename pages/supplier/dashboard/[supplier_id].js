import React from 'react'
import moment from 'moment';
import Head from '../../../components/head'
import { useRouter } from 'next/router'
import axios from 'axios';
import { logger, absoluteUrl } from '../../../utils';
import './supplier.scss';


const Supplier = ({
	firstName,
	id,
	orders,
}) => {
	return (
		<div>
			<Head />
			<div>Welcome, {firstName} {id}</div>
			<p>Please track and update your orders here.</p>

			<ul className="Row">
				<li className="Column One">Date</li>
				<li className="Column Two">Status</li>
				<li className="Column Three">Invoice Id</li>
				<li className="Column Four">Add tracking information</li>
			</ul>
				{
					orders.map(order => (
						<ul className="Row" key={order.invoiceNumber}>
							<li className="Column One">{moment(order.completionDate).format('ll')}</li>
							<li className="Column Two">{order.status}</li>
							<li className="Column Three">{order.invoiceNumber}</li>
							<li className="Column Four"><button>+</button></li>
						</ul>
					))
				}

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

export default Supplier;
