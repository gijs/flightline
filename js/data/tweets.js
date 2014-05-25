'use strict';

define([
    'flight/lib/component',
    '../storage'
], function (defineComponent, dataStore) {
    function timeline () {
        this.defaultAttrs({
            dataStore: dataStore
        });

        this.add = function (e, data) {
            var tweet = this.attr.dataStore.save({
                raw: data.raw,
                date: (new Date()).getTime()
            });

            this.trigger('dataTweetAdded', { tweet: tweet });
        };

        this.load = function () {
            var tweets = this.attr.dataStore.all();
            this.trigger('dataTweetsLoaded', { tweets: tweets });
        };

        this.after('initialize', function () {
            this.on(document, 'uiAddRequested', this.add);
            this.on(document, 'uiLoadRequested', this.load);
        });
    }

    return defineComponent(timeline);
})
