# @absolunet/bamboo-connector

[![npm](https://img.shields.io/npm/v/@absolunet/bamboo-connector.svg)](https://www.npmjs.com/package/@absolunet/bamboo-connector)
[![npm dependencies](https://david-dm.org/absolunet/node-bamboo-connector/status.svg)](https://david-dm.org/absolunet/node-bamboo-connector)
[![npms](https://badges.npms.io/%40absolunet%2Fbamboo-connector.svg)](https://npms.io/search?q=%40absolunet%2Fbamboo-connector)
[![Travis CI](https://travis-ci.com/absolunet/node-bamboo-connector.svg?branch=master)](https://travis-ci.com/absolunet/node-bamboo-connector/builds)
[![Code style ESLint](https://img.shields.io/badge/code_style-@absolunet/node-659d32.svg)](https://github.com/absolunet/eslint-config-node)

> [Bitbucket](https://bitbucket.org) [API](https://developer.atlassian.com/bitbucket/api/2/reference/) wrapper via OAuth2

Authenticate to Atlassian Bamboo API via OAuth2 or basic with Axios


## Install

```sh
$ npm install @absolunet/bamboo-connector
```


## Usage

```js
const BambooConnector = require('@absolunet/bamboo-connector');


const basicBamboo = new BambooConnector({
	auth: {
		type: 'basic',
		username: 'lkjhgfdsa',
		secret: 'mnbvcxz'
	},
	url: 'https://bamboo.domain.com:8085'
}); // axios instance

const oauthBamboo = new BambooConnector({
	auth: {
		type: 'oauth2',
		key: 'zyxwvutsrqponmlkji',
		secret: 'abcdefghijklmnopqrstuvwxyz012345'
	},
	url: 'https://bamboo.domain.com:8085'
}); // axios instance
```

Then, you can make direct API calls

```js
basicBamboo.get(`/rest/api/latest/result/${PROJECT_KEY}-${PLAN_KEY}`)
	.then((results) => {
		// do wathever you want
	});
```
