//--------------------------------------------------------
//-- Bamboo Connector - Config factory
//--------------------------------------------------------
'use strict';

const ow        = require('ow');
const AuthTypes = require('../auth-types');


module.exports = (config) => {

	ow(config, ow.object.exactShape({
		auth: ow.any(...[
			ow.object.exactShape({
				type:   ow.string.equals(AuthTypes.OAuth2),
				key:    ow.string,
				secret: ow.string
			}),
			ow.object.exactShape({
				type:     ow.string.equals(AuthTypes.Basic),
				username: ow.string,
				password: ow.string
			})
		]),
		port: ow.optional.number.positive.lessThanOrEqual(65535),
		url:  ow.string.url
	}));

	const { auth: { type: authType, ...credentials }, port, url } = config;

	const instanceConfig = {
		baseURL: `${url}${port ? `:${port}` : ''}`
	};

	if (authType === AuthTypes.Basic) {
		instanceConfig.auth = credentials;
	}

	return instanceConfig;
};
