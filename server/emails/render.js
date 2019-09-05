const hbs = require('hbs');
// const Handlebars = require('handlebars');

const fs = require('fs');
const readFile = require('util').promisify(fs.readFile);


hbs.registerHelper('if_eq', function(a, b, opts) {
    if(a == b)
        return opts.fn(this);
    else
        return opts.inverse(this);
});

hbs.registerHelper('date', function(date) {
    console.log('date', date);
		return 'DATE';
});

hbs.registerHelper('has_any', function(object) {
    console.log('object', object);
		return false;
});


hbs.registerHelper('money', function(value) {
    console.log('value', value);
		return Number(value).toFixed(2);
});

hbs.registerHelper('if_not_eq', function(a, b) {
    console.log('a', a);
		console.log('b', b);
		return a !== b
});


const render = async (file, data) => {
    const content = await readFile('/Users/sara/repos/dankport/server/emails/notify-supplier.hbs', 'utf8');
    // Implement cache if you want
    const template = hbs.compile(content);
    return template(data);
}

module.exports = render;



// const source = require('./source');
//
// module.exports = (data) => {
// 	const template = Handlebars.compile(source);
// 	console.log('template');
// 	return template(data);
// }
