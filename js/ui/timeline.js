/* global define */
'use strict';

define([
    'flight/lib/component',
    'text!templates/tweet.html',
    '../utils',
    '../format'
], function (defineComponent, tweetTmpl, utils, tweetFormatter) {
    function timeline() {
        var template = utils.tmpl(tweetTmpl);

        this.renderAll = function (e, data) {
            this.$node.html('');
            data.tweets.forEach(function (each) {
                this.render(e, { tweet: each });
            }, this);
        };

        this.render = function (e, data) {
            this.$node.append(template(data.tweet));
        };

        this.after('initialize', function () {
            this.on(document, 'dataTweetAdded', this.render);
            this.on(document, 'dataTweetsLoaded', this.renderAll);

            this.trigger('uiLoadRequested');
        })
    }

    return defineComponent(timeline);
});
