# Tweet Formatter [![Build Status](https://travis-ci.org/pveyes/tweet-formatter.png?branch=master)](https://travis-ci.org/pveyes/tweet-formatter)

> Format tweet text to proper html link tag on username, hashtag, and URL

## Install

#### [NPM](https://npmjs.org/package/tweet-formatter)

    npm install --save tweet-formatter

#### [Bower](http://bower.io)

	bower install --save tweet-formatter

#### [Component](https://github.com/component/component)

    component install pveyes/tweet-formatter

## Example

#### Node.JS

```js
var tweetFormatter = require('tweet-formatter');
var tweet = 'some tweet text with @username and #hashtag or http://url.com';

var formattedTweet = tweetFormatter(tweet);
console.log(formattedTweet);
// outputs:
// some tweet text with <a href="https://twitter.com/username">@username</a>
// and <a href="https://twitter.com/search?q=%23hashtag&src=hash">#hashtag</a>
// or <a href="http://url.com">http://url.com</a>
```

## License

MIT