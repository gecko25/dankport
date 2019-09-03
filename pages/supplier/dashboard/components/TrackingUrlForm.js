import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

/** Helpers **/
import { logger, absoluteUrl } from '../../../../utils';

/** Universial components */
import { Input } from '../../../../components';

const ValidationSchema = Yup.object().shape({
  tracking_number: Yup.string()
    .required('Required'),
  shipping_carrier: Yup.string()
    .required('Required'),
  tracking_url: Yup.string()
    .required('Required'),
});

const TrackingUrlForm = ({ token, handleClose }) => (
	<Formik
		initialValues={{
			token,
			tracking_number: '784161861250',
			shipping_carrier: 'Fed ex',
			tracking_url: 'https://www.fedex.com/apps/fedextrack/?action=track&tracknumbers=784161861250&language=en&opco=FDEG&clientype=ivother',
		}}
		validationSchema={ValidationSchema}
		onSubmit={async (values, actions) => {
			try {
				logger.info('Submitting values..', values);
				const response = await axios.put(`/api/orders`, {
					...values,
				});
				handleClose({ refreshData: true });
				actions.setSubmitting(false);
			} catch (error) {
				logger.error(error);
				actions.setSubmitting(false);
			}
		}}
		render={({ errors, status, touched, isSubmitting }) => (
			<Form>
				<Field
					className="TrackingNumber"
					component={Input}
					type="text"
					name="tracking_number"
					placeholder="784161861250"
					label="Tracking Number"
				/>
				<Field
					component={Input}
					type="text"
					name="shipping_carrier"
					placeholder="Fedex, usps.."
					label="Shipping Carrier"
				/>
				<Field
					component={Input}
					type="text"
					name="tracking_url"
					placeholder="https://www.fedex.com/apps/fedextrack/?action=track&tracknumbers=784161861250&language=en&opco=FDEG&clientype=ivother"
					label="Tracking url"
				/>
				<Field
					type="hidden"
					name="token"
				/>
				<Button
					type="submit"
					disabled={isSubmitting}
					variant="primary"
				>
					{
						isSubmitting ? <span>Submitting</span> : <span>Save Changes</span>
					}
				</Button>
			</Form>
		)}
	/>
)

export default TrackingUrlForm;
