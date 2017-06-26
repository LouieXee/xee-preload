'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _utils = require('./utils');

var __canvas__ = document.createElement('canvas');

exports["default"] = {

    transition: (0, _utils.getAvaliableProperty)(['transition', 'webkitTransition', 'mozTransition', 'oTransition']),

    animation: (0, _utils.getAvaliableProperty)(['animation', 'webkitAnimation', 'mozAnimation', 'oAnimation']),

    transform: (0, _utils.getAvaliableProperty)(['transform', 'webkitTransform', 'mozTransform', 'oTransform']),

    media: function () {
        var video = document.createElement('video');
        var audio = document.createElement('audio');

        return !!video.play && !!audio.play;
    }(),

    canvas: !!__canvas__.getContext,

    webgl: function () {
        try {
            return !!__canvas__.getContext('webgl');
        } catch (e) {
            return false;
        }
    }()

};
module.exports = exports['default'];