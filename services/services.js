let dao = require('../model/dao');
let newsDAO = dao.NewsDAO;
let userDAO = dao.UserDAO;

function fetchNews(req, res, next) {
	newsDAO.fetchNews(function(err, news) {
		if (err) {
			res.send(500, err);
			return;
		}

		res.send(200, news);
	});

	next();
}

function createNews(req, res, next) {
	let params = req.body;

	let title = params.title;
	let date = new Date(params.date);
	let excerpt = params.excerpt;
	let link = params.link;

	let news = {
		title: title,
		date: date,
		excerpt: excerpt,
		link: link
	};

	newsDAO.createNews(news, function(err, newNews) {
		if (err) {
			res.send(500, err);
			return;
		}

		res.send(201, newNews);
	});

	next();
}

function createUser(req, res, next) {
	let params = req.body;

	let sms = params.sms;
	let email = params.email;
	let lat = params.lat;
	let long = params.long;

	let user = {
		sms: sms,
		email: email,
		lat: lat,
		long: long
	};

	userDAO.create_user(user, function(err, newUser) {
		if (err) {
			res.send(500, err);
			return;
		}

		res.send(201, newUser);
	});

	next();
}

function deleteUser(req, res, next) {
	let email = req.params.email;

	userDAO.delete_user(email, function (err) {
		if (err) {
			res.send(500, err);
			return;
		}

		res.send(202);
	});

	next();
}

function  fetchUsers(req, res, next) {
	userDAO.fetch_users(function(err, users) {
		if (err) {
			res.send(500, err);
			return;
		}

		res.send(200, users);
	});

	next();
}

module.exports = {
	fetchNews: fetchNews,
	createNews: createNews,
	createUser: createUser,
	deleteUser: deleteUser,
	fetchUsers: fetchUsers
};