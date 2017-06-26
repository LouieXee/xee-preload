'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var userAgent = navigator.userAgent.toLowerCase();

var webkit = /(webkit)[ \/]([\w.]+)/;
var opera = /(opera)(?:.*version)?[ \/]([\w.]+)/;
var msie = /(msie) ([\w.]+)/;
var mozilla = /(mozilla)(?:.*? rv:([\w.]+))?/;

var result = webkit.exec(userAgent) || opera.exec(userAgent) || msie.exec(userAgent) || userAgent.indexOf('compatible') && mozilla.exec(t) || [];

exports["default"] = {
    browser: result[1] || '',
    version: result[2] || '0',
    msie: 'msie' == result[1],
    weixin: !!/micromessenger/.exec(userAgent),
    ios: !!/iphone/.exec(userAgent) || !!/ipad/.exec(userAgent) || !!/ipod/.exec(userAgent),
    android: !!/android/.exec(userAgent)
};
module.exports = exports['default'];