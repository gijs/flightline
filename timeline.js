/** @jsx React.DOM */

var data = [
	{text:'More random tweet ' + Math.random(), date: new Date(), user:'pveyes', name:'Fatih Kalifa'},
	{text:'Some random tweet', date: new Date(), user:'pveyes', name:'Fatih Kalifa'},
]

var Tweet = React.createClass({
	render: function () {
		return <li className='tweet'>
			<div className='tweet-user'>
				<strong className='user-full-name'>{this.props.name}</strong>
				<span className='user-username'>@{this.props.user}</span>
			</div>
			<div className='tweet-text'>{this.props.text}</div>
			<div className='tweet-time'>{this.props.date.toTimeString()}</div>
		</li>
	}
});

var TweetList = React.createClass({
	render: function () {
		var tweetNodes = this.props.data.map(function (tweet) {
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

	onChange: function (e) {
		this.setState({text: e.target.value})
	},

	onSubmit: function (e) {
		e.preventDefault();

		this.props.onTweetSubmit({
			text: this.state.text,
			date: new Date(),
			user: 'pveyes',
			name: 'Fatih Kalifa'
		});

		this.setState({text: ''});

		console.log(this.state.text);
	},

	render: function () {
		return <form onSubmit={this.onSubmit} className='col-lg-3'>
			<textarea className='form-control tweet-input' onChange={this.onChange} value={this.state.text} placeholder='Compose new Tweet...'></textarea>
			<input className='btn btn-primary tweet-submit' type='submit' value='Tweet' />
		</form>;
	}
});

var Timeline = React.createClass({

	getInitialState: function () {
		return {data: this.props.data};
	},

	handleTweetSubmit: function (tweet) {

		// push to stack
		var tweets = this.state.data;
		tweets.unshift(tweet);

		console.log(tweets);

		this.setState({data: tweets});
	},

	render: function () {
		return <div className='container'>
			<TweetForm onTweetSubmit={this.handleTweetSubmit} />
			<TweetList data={this.state.data} />
		</div>;
	}
});

React.renderComponent(<Timeline data={data} />, document.querySelector('timeline'));