//--------------------------------------------------------
//-- Bamboo Connector - Types - Axios
//--------------------------------------------------------

import { AxiosInstance, AxiosRequestConfig, AxiosStatic as BaseAxiosStatic } from 'axios';

export interface Constructor {
	new(config: AxiosRequestConfig): AxiosInstance;
}

export interface AxiosStatic extends BaseAxiosStatic {
	Axios: Constructor
}
