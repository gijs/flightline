var FormatTweet = (function(text) {

	this.parse = function (text) {
		this.tweet = text;
		this.parseURL().parseUsername().parseHashtag();

		return this.tweet;		
	}

	this.parseHashtag = function () {
		this.tweet = this.tweet.replace(
			/\B#([\w-]+)/gm,
			'<a href="https://twitter.com/search?q=%23$1&src=hash">#$1</a>'
		);

		return this;
	};

	this.parseUsername = function () {
		// ref: http://stackoverflow.com/questions/5973187/parsing-twitter-name-with-regex-and-javascript
		this.tweet = this.tweet.replace(
			/\B@([\w-]+)/gm,
			'<a href="http://twitter.com/$1">@$1</a>'
		);

		return this;
	};

	this.parseURL = function () {
		// ref: http://stackoverflow.com/questions/19625183/js-find-urls-in-text-make-links
		this.tweet = this.tweet.replace(
			/((http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?)/g,
			'<a href="$1">$1</a>'
		);

		return this;
	};

	return this;

})();