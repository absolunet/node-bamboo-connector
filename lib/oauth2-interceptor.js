//--------------------------------------------------------
//-- Bamboo Connector - OAuth2Interceptor
//--------------------------------------------------------
'use strict';

const { create } = require('simple-oauth2');


class OAuth2Interceptor {

	/**
	 * OAuth2Interceptor constructor.
	 *
	 * @constructor
	 * @param {ConnectorConfig} config
	 */
	constructor(config) {
		this.config = config;
		this._client = null;
		this._tokenRequest = null;
		this._token  = null;
	}

	/**
	 * @type Function
	 * @see handleRequest
	 */
	get request() {
		return this.handleRequest.bind(this);
	}

	/**
	 * Handle request call.
	 *
	 * @param {AxiosRequestConfig} config
	 * @returns {Promise<AxiosRequestConfig>}
	 */
	handleRequest(config) {
		return Promise.resolve(this._token || this.requestForToken())
			.then((token) => {
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
	requestForToken() {
		if (!this._tokenRequest) {
			const { clientCredentials, accessToken } = this.getClient();

			this._tokenRequest = clientCredentials.getToken({})
				.then((token) => {
					this._tokenRequest = null;
					({ token: { access_token: this._token } } = accessToken.create(token));

					return this._token || Promise.reject(new TypeError(`Access token can't be fetched`));
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
	getClient(fresh = false) {
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
	getFreshClient() {
		const { url, auth } = this.config;
		const { key: id, secret } = auth;

		return create({
			client: { id, secret },
			auth: {
				tokenHost: url,
				tokenPath: '/access_token'
			}
		});
	}

}


module.exports = OAuth2Interceptor;
