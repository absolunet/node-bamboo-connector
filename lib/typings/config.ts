//--------------------------------------------------------
//-- Bamboo Connector - Types - Config
//--------------------------------------------------------

import { AuthTypes } from './auth';


export interface ConnectorConfig {
	auth: BasicAuthenticationConfig | OAuth2AuthenticationConfig;
	port?: number;
	url: string;
}

export interface AuthenticationConfig {
	type: AuthTypes;
}

export interface BasicAuthenticationConfig extends AuthenticationConfig {
	username: string;
	password: string;
}

export interface OAuth2AuthenticationConfig extends AuthenticationConfig {
	key: string;
	secret: string;
}
