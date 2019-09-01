import { ErrorMessage } from 'formik';
import './Input.scss';


const Error = (errors) => {
	const key = Object.keys(errors)[0];
	return (
		<div style={{ color: 'red' }} className="Error">{errors[key]}</div>
	);
}

const Input = ({
	className,
	type,
  field, // { name, value, onChange, onBlur }
  form, // { touched, errors } also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
	label,
  ...props
}) => {
	return (
		<div>
			<ErrorMessage name={field.name} component={Error} />
			<div>{label}</div>
			<input
				className={`Input ${className}`}
				type={type} {...field} {...props}
			/>
		</div>
	)
}

export default Input;
