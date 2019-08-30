import url from 'url';
import colors from 'colors';
import tracer from 'tracer';

export const absoluteUrl = (req, setLocalhost) => {
  let protocol = 'https';
  let host = req ? req.headers.host : window.location.hostname;

  if (host.indexOf('localhost') > -1) {
    if (setLocalhost) {
      host = setLocalhost;
    }
    protocol = 'http';
  }

  return url.format({
    protocol,
    host,
    pathname: '/', // req.url
  });
};


export const logger = require('tracer')
		.colorConsole(
				{
          level: 'info',
          filters : {
      			//log : colors.black,
      			trace : colors.gray,
      			debug : colors.white,
      			info : colors.gray,
      			warn : colors.yellow,
      			error : [ colors.red, colors.bold ]
      		},
					format : [
					          "{{timestamp}} {{title}} (client) {{message}} ({{file}}:{{line}})", //default format
					          {
					        	  error : "{{timestamp}} (client) {{title}} {{message}} ({{file}}:{{line}})\nCall Stack:\n{{stack}}" // error format
					          }
					],
					dateformat : "HH:MM:ss.L",
					preprocess :  function(data){
						data.title = data.title.toUpperCase();
					}
				});

export default absoluteUrl;
