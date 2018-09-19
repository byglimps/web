module.exports = {
	apps : [{
		name      : 'web',
		script    : './build/server.js',
		port: 3002,
		env: {
			NODE_ENV: 'development',
		},
		env_production : {
			NODE_ENV: 'production',
		}
	}]
};
