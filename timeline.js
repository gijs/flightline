/** @jsx React.DOM */

var sampleTweets = [
	{text: 'My first time learning #ReactJS http://pvey.es/blog/first-time-learning-react/ by @pveyes', date: new Date(), user:'pveyes', name:'Fatih Kalifa'},
];

var Tweet = React.createClass({
	render: function () {
		var tweet = FormatTweet.parse(this.props.text);
		return <li className='tweet'>
			<div className='tweet-user'>
				<strong className='user-full-name'>{this.props.name}</strong>
				<span className='user-username'>@{this.props.user}</span>
			</div>
			<div className='tweet-text' dangerouslySetInnerHTML={{__html: tweet}} />
			<div className='tweet-time'>{this.props.date.toTimeString()}</div>
		</li>
	}
});

var TweetList = React.createClass({
	render: function () {
		var tweetNodes = this.props.tweets.map(function (tweet) {
			return <Tweet text={tweet.text} date={tweet.date} user={tweet.user} name={tweet.name} />;
		});

		return <ul className='col-lg-6 tweet-list'>
			<h4>Tweets</h4>
			{tweetNodes}
		</ul>;
	}
});

var TweetForm = React.createClass({
	getInitialState: function () {
		return {text: ''}
	},

	onFocus: function (e) {
		if (this.state.text == '') {
			e.target.innerHTML = '';
		}
	},

	onBlur: function (e) {
		console.log(this.state.text);
		if (this.state.text == '') {
			e.target.innerHTML = 'Compose new Tweet...';
		}
	},

	onInput: function (e) {
		this.setState({text: e.target.innerHTML})
	},

	onSubmit: function (e) {
		e.preventDefault();

		if (this.state.text == null || this.state.text == '') {
			return false;
		}
		else {
			this.props.onTweetSubmit({
				text: this.state.text,
				date: new Date(),
				user: 'pveyes',
				name: 'Fatih Kalifa'
			});
			
			this.setState({text: ''});
		}
	},

	render: function () {
		return <form onSubmit={this.onSubmit} className='col-lg-3'>
			<div contentEditable='true'
				className='form-control tweet-input'
				onFocus={this.onFocus}
				onBlur={this.onBlur}
				onInput={this.onInput}
				value={this.state.text}>Compose new Tweet...</div>
			<input className='btn btn-primary tweet-submit' type='submit' value='Tweet' />
		</form>;
	}
});

var Timeline = React.createClass({

	getInitialState: function () {
		return {tweets: this.props.tweets};
	},

	handleTweetSubmit: function (tweet) {
		// push to stack
		var tweets = this.state.tweets;
		tweets.unshift(tweet);

		this.setState({tweets: tweets});
	},

	render: function () {
		return <div className='container'>
			<TweetForm onTweetSubmit={this.handleTweetSubmit} />
			<TweetList tweets={this.state.tweets} />
		</div>;
	}
});

React.renderComponent(<Timeline tweets={sampleTweets} />, document.querySelector('timeline'));