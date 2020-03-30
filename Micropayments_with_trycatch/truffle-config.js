require('babel-register');
require('babel-polyfill');
require('dotenv').config();
const HDWalletProvider = require('truffle-hdwallet-provider');
module.exports = {
	networks: {
		development: {
			host: 'localhost',
			port: 7545,
			network_id: '*' // eslint-disable-line camelcase
		}
	},
	solc: {
		optimizer: {
			enabled: true,
			runs: 200
		}
	}
};
