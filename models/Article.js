const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var ArticleSchema = new Schema({
	headline: {
		type: String,
		required: true
	}
	articleURL: {
		type: String,
		required: true
	}
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;