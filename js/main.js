'use strict';

require.config({
  baseUrl: './',
  urlArgs: "bust=" + (new Date()).getTime(),
  paths: {
    jquery: 'bower_components/jquery/dist/jquery.min',
    es5shim: 'bower_components/es5-shim/es5-shim',
    es5sham: 'bower_components/es5-shim/es5-sham',
    text: 'bower_components/requirejs-text/text',
    flight: 'bower_components/flight',
    depot: 'bower_components/depot/depot',
    tweetFormatter: 'bower_components/tweet-formatter/tweet-formatter'
  },
  shim: {
    'js/app': {
      deps: ['jquery', 'es5shim', 'es5sham']
    }
  }
});

require(['js/app'], function (App) {
  App.initialize();
});
