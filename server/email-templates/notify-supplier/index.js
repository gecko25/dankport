const source = require('./source');
const Handlebars = require('handlebars');

module.exports = (data) => {
	const template = Handlebars.compile(source);
	return template(data);
}
