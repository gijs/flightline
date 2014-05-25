/* global define */
'use strict';

define([
    'flight/lib/component',
], function (defineComponent) {
    function newTweet() {

        this.defaultAttrs({
            submitSelector: 'button.submit',
            inputSelector: '.input'
        });

        this.createNew = function (e, data) {
            var $tweetInput = $('#tweet-input');

            this.trigger('uiAddRequested', {
                raw: $tweetInput.val().trim()
            });

            $tweetInput.val('');
        }

        this.after('initialize', function () {
            this.on('click', { 'submitSelector': this.createNew });
        });
    }

    return defineComponent(newTweet);
})
