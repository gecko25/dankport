const colors = require('colors');
const logger = require('tracer')
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
					          "{{timestamp}} {{title}} (server) {{message}} ({{file}}:{{line}})", //default format
					          {
					        	  error : "{{timestamp}} {{title}} (server) {{message}} ({{file}}:{{line}})\nCall Stack:\n{{stack}}" // error format
					          }
					],
					dateformat : "HH:MM:ss.L",
					preprocess :  function(data){
						data.title = data.title.toUpperCase();
					}
				});

module.exports = logger;
