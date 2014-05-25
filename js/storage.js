/* global define */
'use strict';

define([
    'depot'
], function (depot) {
    return depot('tweets', { idAttribute: 'id' })
})
