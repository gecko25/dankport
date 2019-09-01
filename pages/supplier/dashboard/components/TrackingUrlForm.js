import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Input } from '../../../../components';
import * as Yup from 'yup';


const formValues = {
	tracking_number: '',
	shipping_carrier: '',
	tracking_url: '',
}

const ValidationSchema = Yup.object().shape({
  tracking_number: Yup.string()
    .required('Required'),
  shipping_carrier: Yup.string()
    .required('Required'),
  tracking_url: Yup.string()
    .required('Required'),
});

const onSubmit = (values, actions) => {
	console.error('submitting values..', values);
	actions.setSubmitting(false);
	// handleClose();
}

const TrackingUrlForm = () => (
	<Formik
		initialValues={formValues}
		validationSchema={ValidationSchema}
		onSubmit={onSubmit}
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
				<Button
					type="submit"
					disabled={isSubmitting}
					variant="primary"
				>
					Save Changes
				</Button>
			</Form>
		)}
	/>
)

export default TrackingUrlForm;
