let model = require('./model');

let NewsModel = model.NewsModel;
let FireUserModel = model.FireUserModel;

let news_dao = {
	createNews : function(news, callback) {
		let newNews = new NewsModel(news);
		newNews.save(function(error) {
			if (error) {
				callback(error, null);
				return;
			}

			callback(null, newNews);
		});
	},
	fetchNews: function(callback) {
		NewsModel.find({}, function(err, news) {
			if (err) {
				callback(err, null);
				return;
			}

			callback(null, news);
		});
	}
};

let user_dao = {
	create_user : function (user, callback) {
		let newUser = new FireUserModel(user);
		newUser.save(function(error) {
			if (error) {
				callback(error, null);
				return;
			}

			callback(null, newUser);
		});
	},
	delete_user: function (email, callback) {
		FireUserModel.find({email: email}, function (err, users) {
			if (err) {
				callback(err);
				return;
			}

			if (users.length === 0) {
				callback({err: "user not found"});
				return;
			}

			FireUserModel.remove({email: email}, function (err) {
				callback(err);
			});
		});
	},
	fetch_users: function(callback) {
		FireUserModel.find({}, function(err, users) {
			callback(err, users);
		});
	}
};

module.exports = {
	NewsDAO: news_dao,
	UserDAO: user_dao
};