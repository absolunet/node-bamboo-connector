//--------------------------------------------------------
//-- Bamboo Connector - BambooConnector
//--------------------------------------------------------

import axios from 'axios';
import configFactory from './factory/config';
import { AxiosStatic } from './typings/axios';
import { ConnectorConfig } from './typings/config';
import AuthTypes from './auth-types';
import OAuth2Interceptor from './oauth2-interceptor';


class BambooConnector extends (axios as AxiosStatic).Axios {

	/**
	 *
	 * @param config
	 */
	constructor(config: ConnectorConfig) {
		super(configFactory(config));

		if (config.auth.type === AuthTypes.OAuth2) {
			const { request: interceptor } = new OAuth2Interceptor(config);
			this.interceptors.request.use(interceptor);
		}
	}

}


export default BambooConnector;
