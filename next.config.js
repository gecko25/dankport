const withSass = require('@zeit/next-sass')
module.exports = withSass({
	webpack: config => {
		// Fixes npm packages that depend on `fs` module
		config.node = {
			fs: 'empty',
			child_process: "empty"
		}

		return config
	}
})
