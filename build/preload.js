'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _xeeUtils = require('xee-utils');

var _xeeUtils2 = _interopRequireDefault(_xeeUtils);

var _xeeMedia = require('xee-media');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var XeePreload = function () {
    function XeePreload() {
        _classCallCheck(this, XeePreload);

        this._cache = {};

        this._EXP_REGS = {
            IMG_REG: /(?:\.jpg|\.jpeg|\.png|\.gif)$/i,
            BASE64_IMG_REG: /^data:image\/(?:png|jpg|jpeg);base64/i,
            AUDIO_REG: /\.mp3$/i,
            VIDEO_REG: /\.mp4$/i,
            JS_REG: /\.js$/i,
            CSS_REG: /\.css$/i
        };
    }

    /*
        @method preload
        @public
        @param {Object} opt.data
        @param {Function} opt.onProgress
        @param {Function} opt.onComplete
    */


    _createClass(XeePreload, [{
        key: 'preload',
        value: function preload(opt) {
            var _this = this;

            var _EXP_REGS = this._EXP_REGS;
            var preloadData = opt.data;
            var onProgress = _xeeUtils2.default.isFunction(opt.onProgress) && opt.onProgress || _xeeUtils2.default.noop;
            var onComplete = _xeeUtils2.default.isFunction(opt.onComplete) && opt.onComplete || _xeeUtils2.default.noop;
            var count = 0;
            var total = 0;

            for (var name in preloadData) {
                (function (name) {
                    var url = preloadData[name];
                    if (_EXP_REGS.IMG_REG.test(url) || _EXP_REGS.BASE64_IMG_REG.test(url)) {
                        total++;
                        var img = new Image();
                        img.onload = function () {
                            _this._cache[name] = img;
                            // IE8下onload回调会在循环结束之前调用
                            setTimeout(_loadedCallback);
                        };
                        img.src = url;
                    } else if (_EXP_REGS.JS_REG.test(url)) {
                        total++;
                        _xeeUtils2.default.loadScript(url).then(function () {
                            _loadedCallback();
                        });
                    } else if (_EXP_REGS.CSS_REG.test(url)) {
                        total++;
                        _xeeUtils2.default.loadStyle(url).then(function () {
                            _loadedCallback();
                        });
                    } else if (_EXP_REGS.VIDEO_REG.test(url)) {
                        if (!_xeeMedia.XeeVideo) {
                            console.error('XeePreload 预加载视频依赖于 XeeVideo，请提前加载该模块!');
                            return false;
                        }

                        if (!_xeeMedia.XeeVideo.IS_SUPPORT_MEDIA) {
                            return false;
                        }

                        total++;
                        var video = new _xeeMedia.XeeVideo({
                            src: url
                        });
                        var removeListener = video.onDone(function () {
                            _this._cache[name] = video;
                            removeListener();
                            _loadedCallback();
                        });
                    } else if (_EXP_REGS.AUDIO_REG.test(url)) {
                        if (!_xeeMedia.XeeAudio) {
                            console.error('XeePreload 预加载音频依赖于 XeeAudio，请提前加载该模块!');
                            return false;
                        }

                        if (!_xeeMedia.XeeVideo.IS_SUPPORT_MEDIA) {
                            return false;
                        }

                        total++;
                        var audio = new _xeeMedia.XeeAudio({
                            src: url
                        });
                        var _removeListener = audio.onDone(function () {
                            _this._cache[name] = audio;
                            _removeListener();
                            _loadedCallback();
                        });
                    }
                })(name);
            }

            function _loadedCallback() {
                count++;
                onProgress(count, total);
                if (count == total) {
                    onComplete();
                }
            }
        }
    }, {
        key: 'get',
        value: function get(name) {
            return this._cache[name];
        }
    }]);

    return XeePreload;
}();

exports.default = new XeePreload();
module.exports = exports['default'];