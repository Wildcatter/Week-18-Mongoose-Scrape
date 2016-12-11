const express = require('express'),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	request = require('request'),
	cheerio = require('cheerio'),
	Promise = require('bluebird');

mongoose.Promise = Promise;

var app = express();

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static("public"));

mongoose.connect("mongodb://localhost/week18scrape");
const db = mongoose.connection
	.on("error", (error) => console.warn("Warning:", error))
	.once("open", () => console.log("Mongoose RUNNIN!"));

// Routes
// ==============

// Let's start with the index route
app.get("/", function(req, res) {
	res.send(index.html);
});

app.get("/scrape", function(req, res) {
	request("http://www.fark.com/politics/", function(error, response, html) {
		var $ = cheerio.load(html);

		$("headline").each(function(i, element) {

			var result = {};

			result.headline = $(this).children("a").text();
			result.articleURL = $(this).children("a").attr("href");

			var entry = new Article(result);

			entry.save(function(err, doc) {
				if (err) {
					console.log(err);
				} else {
					console.log(doc);
				}
			});
		});
	});
	res.send("Scrape Complete. :)")
});

app.get("/articles", function(req, res) {
	Article.find({}, function(error, doc) {
		if (error) {
			console.log(error);
		} else {
			res.json(doc);
		}
	})
});

app.listen(3000, () => {
	console.log("App running on Port 3000.")
});