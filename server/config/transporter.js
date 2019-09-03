const nodemailer = require('nodemailer');
const logger = require('./logger');

const createTransporter = () => {
	logger.info('Going to configure SMTP transporter');

	let transporter;
	try {
		transporter = nodemailer.createTransport({
	      host: 'smtp-relay.sendinblue.com',
	      port: 587,
	      secure: false, // true for 465, false for other ports
	      auth: {
	          user: 'saradankport@gmail.com',
	          pass: 'd0j4fLpYhxGtsSHR'
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


/*
// send mail with defined transport object
let info = await transporter.sendMail({
		from: '"Fred Foo 👻" <foo@example.com>', // sender address
		to: 'bar@example.com, baz@example.com', // list of receivers
		subject: 'Hello ✔', // Subject line
		text: 'Hello world?', // plain text body
		html: '<b>Hello world?</b>' // html body
});

console.log('Message sent: %s', info.messageId);
// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

// Preview only available when sending through an Ethereal account
console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

*/
