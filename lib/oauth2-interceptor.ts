//--------------------------------------------------------
//-- Bamboo Connector - OAuth2Interceptor
//--------------------------------------------------------

import { AxiosRequestConfig } from 'axios';
import { create, OAuthClient, Token } from 'simple-oauth2';
import { ConnectorConfig, OAuth2AuthenticationConfig } from './typings/config';


class OAuth2Interceptor {

	/**
	 * OAuth client instance.
	 *
	 * @type {OAuthClient}
	 */
	protected _client: OAuthClient | null = null;

	/**
	 *
	 * @type {Promise<string>}
	 */
	protected _tokenRequest: Promise<string> | null = null;

	/**
	 * @type {string}
	 */
	protected _token: string | null = null;

	/**
	 * @constructor
	 * @param {ConnectorConfig} config
	 */
	constructor(
		protected config: ConnectorConfig
	) {
	}

	/**
	 * @type Function
	 * @see handleRequest
	 */
	get request() {
		return this.handleRequest.bind(this);
	}

	/**
	 * Handle request call
	 * @param {AxiosRequestConfig} config
	 * @returns {Promise<AxiosRequestConfig>}
	 */
	handleRequest(config: AxiosRequestConfig): Promise<AxiosRequestConfig> {
		return Promise.resolve(this._token || this.requestForToken())
			.then((token: string) => {
				config.headers.authorization = `Bearer ${token}`;

				return config;
			});
	}

	/**
	 * Request for an OAuth2 bearer token.
	 *
	 * @protected
	 * @returns {Promise<string>}
	 */
	protected requestForToken(): Promise<string> {
		if (!this._tokenRequest) {
			const { clientCredentials, accessToken } = this.getClient();

			this._tokenRequest = clientCredentials.getToken({})
				.then((token: Token) => {
					this._tokenRequest = null;
					({ token: { access_token: this._token } } = accessToken.create(token));

					return this._token || Promise.reject<string>(`Access token can't be fetched`);
				});
		}

		return Promise.resolve(this._tokenRequest);
	}

	/**
	 * Get OAuth2 client instance
	 *
	 * @protected
	 * @param {boolean} fresh Get a fresh instance.
	 * @returns {OAuthClient}
	 */
	protected getClient(fresh: boolean = false): OAuthClient {
		if (!this._client || fresh) {
			const client = this.getFreshClient();

			if (fresh) {
				return client;
			}

			this._client = client;
		}

		return this._client;
	}

	/**
	 * Get a fresh OAuth2 client instance
	 *
	 * @protected
	 * @returns {OAuthClient}
	 */
	protected getFreshClient(): OAuthClient {
		const { url, auth } = this.config;
		const { key: id, secret } = auth as OAuth2AuthenticationConfig;

		return create({
			client: { id, secret },
			auth: {
				tokenHost: url,
				tokenPath: '/access_token'
			}
		});
	}

}


export default OAuth2Interceptor;
