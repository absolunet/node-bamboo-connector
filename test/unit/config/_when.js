'use strict';

const data            = require('./_data');
const BambooConnector = require('./../../../dist');


module.exports = {

	instantiatingConnectorWithoutArgument() {
		console.log(BambooConnector);
		try {
			data.connector = new BambooConnector();
		} catch (error) {
			data.error = error;
		}
	},

	instantiatingConnector() {
		try {
			data.connector = new BambooConnector(data.config);
		} catch (error) {
			data.error = error;
		}
	}

};
