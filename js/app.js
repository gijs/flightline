'use strict';

define([
    './data/tweets',
    './ui/new-tweet',
    './ui/timeline'
], function (TweetData, NewTweetUI, TimelineUI) {
    var initialize = function () {
        TweetData.attachTo(document);
        NewTweetUI.attachTo('#new-tweet');
        TimelineUI.attachTo('#timeline');
    };

    return {
        initialize: initialize
    };
})
