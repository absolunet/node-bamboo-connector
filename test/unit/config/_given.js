'use strict';

const data  = require('./_data');
const axios = require('axios');


module.exports = {

	emptyConfig() {
		data.config = {};
	},

	url(url = 'http://bamboo.example.com') {
		data.config.url = url;
	},

	axios() {
		data.config.axios = axios.create();
	},

	oauth2() {
		data.config.auth = {
			type: 'oauth2',
			key: 'test',
			secret: 'secret'
		};
	},

	basicAuth() {
		data.config.auth = {
			type: 'basic',
			username: 'test',
			password: 'secret'
		};
	}

};
