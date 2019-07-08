import { AxiosRequestConfig } from 'axios';
import ow from 'ow';
import { BasicAuthenticationConfig, ConnectorConfig } from '../typings/config';
import AuthTypes from '../auth-types';

export default (config: ConnectorConfig): AxiosRequestConfig => {

	ow(config, ow.object.exactShape({
		auth: ow.any(
			ow.object.exactShape({
				type: ow.string.equals(AuthTypes.OAuth2),
				key: ow.string,
				secret: ow.string
			}),
			ow.object.exactShape({
				type: ow.string.equals(AuthTypes.Basic),
				username: ow.string,
				password: ow.string
			})
		),
		port: ow.optional.number.positive.lessThanOrEqual(65535),
		url: ow.string.url
	}));

	const { auth: { type: authType, ...credentials }, port, url } = config;

	const instanceConfig = {
		baseURL: `${url}${port ? `:${port}` : ''}`
	} as AxiosRequestConfig;

	if (authType === AuthTypes.Basic) {
		instanceConfig.auth = credentials as BasicAuthenticationConfig
	}

	return instanceConfig;
};
