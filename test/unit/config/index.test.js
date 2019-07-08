//--------------------------------------------------------
//-- Tests - Unit
//--------------------------------------------------------
'use strict';

const given = require('./_given');
const when  = require('./_when');
const then  = require('./_then');


describe('Configuration', () => {

	test('connector without config throws', () => {
		when.instantiatingConnectorWithoutArgument();

		then.shouldHaveThrown();
		then.shouldNotHaveConnector();
	});

	test('Connector without auth throws', () => {
		given.url();
		given.axios();

		when.instantiatingConnector();

		then.shouldHaveThrown();
		then.shouldNotHaveConnector();
	});

	test('Connector without url throws', () => {
		given.basicAuth();
		given.axios();

		when.instantiatingConnector();

		then.shouldHaveThrown();
		then.shouldNotHaveConnector();
	});

	test('Connector without axios does not throw', () => {
		given.basicAuth();
		given.url();

		when.instantiatingConnector();

		then.shouldNotHaveThrown();
		then.shouldHaveConnector();
	});

});
