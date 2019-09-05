const hbs = require('hbs');
const moment = require('moment');
const fs = require('fs');
const readFile = require('util').promisify(fs.readFile);


/* Helper functions */
hbs.registerHelper('if_eq', function(a, b, opts) {
	if(a == b)
		return opts.fn(this);
	else
		return opts.inverse(this);
});

hbs.registerHelper('if_not_eq', function(a, b, opts) {
	if(a !== b)
		return opts.fn(this);
	else
		return opts.inverse(this);
});


hbs.registerHelper('has_any', function(array, opts) {
		if(Boolean(array && array.length))
			return opts.fn(this);
		else
			return opts.inverse(this);
});


hbs.registerHelper('date', function(date) {
		return moment(date).format('ll')
});


hbs.registerHelper('money', function(value) {
		const formatted = Number(value).toFixed(2);
		if (formatted === 'NaN') {
			return '$0.00';
		}

		return formatted;
});
/*****************************************************/

const render = async (file, data) => {
	const path = `${__dirname}/${file}`;
    const content = await readFile(path, 'utf8');
    // Implement cache if you want
    const template = hbs.compile(content);
    return template(data);
}

module.exports = render;
