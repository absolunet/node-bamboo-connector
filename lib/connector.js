//--------------------------------------------------------
//-- Bamboo Connector - BambooConnector
//--------------------------------------------------------
'use strict';

const { Axios }         = require('axios');
const configFactory     = require('./factory/config');
const AuthTypes         = require('./auth-types');
const OAuth2Interceptor = require('./oauth2-interceptor');


class BambooConnector extends Axios {

	/**
	 * BambooConnector constructor.
	 *
	 * @param config
	 */
	constructor(config) {
		super(configFactory(config));

		if (config.auth.type === AuthTypes.OAuth2) {
			const { request: interceptor } = new OAuth2Interceptor(config);
			this.interceptors.request.use(interceptor);
		}
	}

}


module.exports = BambooConnector;
