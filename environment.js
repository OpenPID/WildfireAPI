
let env = require('./env.json');

let node_env = process.env.NODE_ENV || 'dev';

let currentEnv = env[node_env];

let isDev = function() {
	let nodeEnv = process.env.NODE_ENV;
	let isDev = nodeEnv === "debug" || nodeEnv === "dev";

	return isDev;
};

console.log("NODE_ENV=" + node_env);

module.exports.config = currentEnv;
module.exports.isDev = isDev;