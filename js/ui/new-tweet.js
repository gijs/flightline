/* global define */
'use strict';

define([
    'flight/lib/component',
], function (defineComponent) {
    function newTweet() {
        var defaultInitText = 'Compose new tweet';

        this.defaultAttrs({
            inputSelector: '.tweet-input',
            submitSelector: 'button.tweet-btn'
        });

        this.onClickInput = function (e, data) {
            if (data.el.innerText == defaultInitText) {
                data.el.innerText = '';
            }
        };

        this.onBlurInput = function (e) {
            var inputEl = e.currentTarget;
            if (inputEl.innerText == '') {
                inputEl.innerText = defaultInitText;
            }
        };

        this.createNew = function (e, data) {
            var $tweetInput = $('#tweet-input');

            this.trigger('uiAddRequested', {
                raw: $tweetInput.text().trim()
            });

            $tweetInput.text('');
        }

        this.after('initialize', function () {
            this.on('click', { 'inputSelector': this.onClickInput });
            this.$node.on('blur', '.tweet-input', this.onBlurInput.bind(this));
            this.on('click', { 'submitSelector': this.createNew });
        });
    }

    return defineComponent(newTweet);
})
