let restify = require('restify');
let services = require('./services/services');

const server = restify.createServer({
	name: 'wildfire_api',
	version: '1.0.0'
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.gzipResponse());
server.use(restify.plugins.authorizationParser());
server.use(restify.plugins.bodyParser());

server.listen(8081, function () {
	console.log('%s listening at %s', server.name, server.url);
});

function wrap(func) {
	return function (req, res, next) {
		func(req, res, next);
	}
}

setupNewsServices();
setupSignUpServices();

function setupSignUpServices() {
	let SIGNUP_PATH = '/signup';
	let SIGNUP_DELETE_PATH = SIGNUP_PATH + "/:email";

	server.post(SIGNUP_PATH, wrap(services.createUser));
	server.del(SIGNUP_DELETE_PATH, wrap(services.deleteUser));
	server.get(SIGNUP_PATH, wrap(services.fetchUsers));
}

function setupNewsServices() {
	let NEWS_PATH = '/news';
	let NEWS_CREATE_PATH = NEWS_PATH;

	server.post(NEWS_CREATE_PATH, wrap(services.createNews));
	server.get(NEWS_PATH, wrap(services.fetchNews));
}
