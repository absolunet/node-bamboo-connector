'use strict';

const data = require('./_data');
const { Axios } = require('axios');


module.exports = {

	shouldHaveConnector() {
		expect(typeof data.connector).toBe('object');
		expect(data.connector).toBeInstanceOf(Axios);
	},

	shouldNotHaveConnector() {
		expect(data.connector).toBeNull();
	},

	shouldHaveThrown() {
		expect(data.error).toBeTruthy();
		expect(data.error.name).toBe('ArgumentError');
	},

	shouldNotHaveThrown() {
		expect(data.error).toBeFalsy();
	}

};
