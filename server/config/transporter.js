const nodemailer = require('nodemailer');
const logger = require('./logger');

const createTransporter = () => {
	logger.info('Going to configure SMTP transporter');

	let transporter;
	try {
		// transporter = nodemailer.createTransport({
	  //     host: 'smtp-relay.sendinblue.com',
	  //     port: 587,
	  //     secure: false, // true for 465, false for other ports
	  //     auth: {
	  //         user: 'saradankport@gmail.com',
	  //         pass: 'd0j4fLpYhxGtsSHR'
	  //     }
	  // });

		transporter = nodemailer.createTransport({
			host: 'smtp.googlemail.com', // Gmail Host
			port: 465, // Port
			secure: true, // this is true as port is 465
			auth: {
					user: 'saradankport@gmail.com', //Gmail username
					pass: 'yellYELLOW11!' // Gmail password
			}
		});

		logger.info('Successfuly created SMTP transporter');

	} catch (error) {
		transporter = {};
		logger.error('There was a problem creating the SMTP transporter', error);
	}

	return transporter;
}

module.exports = createTransporter();
