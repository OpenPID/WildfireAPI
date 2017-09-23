let env = require('../environment').config;
let connectionString = 'mongodb://' + env.mongodb.host + ":" + env.mongodb.port;

let mongoose = require('mongoose');
mongoose.connect(connectionString, function() {

});

let Schema = mongoose.Schema;

let user_schema = new Schema({
	sms: { type: String, required: false },
	email: { type: String, required: true },
	lat: { type: Number, required: false },
	long: { type: Number, required: false }
});

let news_schema = new Schema({
	title: { type: String, required: true },
	date: { type: Date, required: true },
	excerpt: { type: String, required: false },
	link: {type: String, required: true }
});


module.exports = {
	FireUserModel: mongoose.model('FireUserModel', user_schema),
	NewsModel: mongoose.model('NewsModel', news_schema)
};


