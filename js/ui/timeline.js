/* global define */
'use strict';

define([
    'flight/lib/component',
    '../utils',
    '../format'
], function (defineComponent, utils, tweetFormatter) {
    var parseTemplate = function (id) {
        var tmpl = document.querySelector(id).innerHTML
        return utils.tmpl(tmpl);
    }

    function timeline() {
        var tweetTmpl = parseTemplate('#tweet-template'),
            tweetQueueTmpl = parseTemplate('#tweet-queue-template'),
            newTweetQueue = [];

        this.defaultAttrs({
            queueSelector: '#tweet-queue'
        });

        this.renderAll = function (e, data) {
            this.$node.html('');
            data.tweets.forEach(function (each) {
                this.render(e, { tweet: each });
            }, this);
        };

        this.render = function (e, data) {
            console.log(data.tweet);
            var template = tweetTmpl(data.tweet)
            this.$node.prepend(template);
        };

        this.pushToQueue = function (e, data) {
            newTweetQueue.push(data.tweet);
            var count = newTweetQueue.length,
                content = { queue: count + ' new Tweet' };

            if (count > 1) {
                // already rendered, just replace innerText
                $('#tweet-queue').text(content.queue + 's')
                return;
            }

            var template = tweetQueueTmpl(content);
            this.$node.prepend(template);
        };

        this.renderQueue = function (e, data) {
            // destroy queue count
            $('#tweet-queue').remove();

            newTweetQueue.forEach(function (each) {
                this.render(e, { tweet: each })
            }, this);

            newTweetQueue = [];
        };

        this.after('initialize', function () {
            this.on(document, 'dataTweetAdded', this.pushToQueue);
            this.on(document, 'dataTweetsLoaded', this.renderAll);

            this.on('click', {'queueSelector': this.renderQueue});

            this.trigger('uiLoadRequested');
        })
    }

    return defineComponent(timeline);
});
