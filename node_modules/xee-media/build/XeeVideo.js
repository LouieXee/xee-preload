'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _package = require('../package.json');

var _XeeMedia2 = require('./XeeMedia');

var _XeeMedia3 = _interopRequireDefault(_XeeMedia2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var $ = _jquery2["default"];

$('head').append($('\n    <style type="text/css">\n        .video__wrapper {\n            position: relative;\n        }\n        .video__main {\n            display: block;\n            width: 100%;\n            height: 100%;\n            position: absolute;\n            left: 0;\n            top: 0;\n        }\n        .video__main.media--loading {\n            display: none;\n        }\n        .video__img{\n            display: block;\n            width: 100%;\n            height: 100%;\n            position: absolute;\n            left: 0;\n            top: 0;\n            opacity: 1;\n            filter: alpha(opacity=100);\n            transition: all .8s ease-in-out;\n        }\n        .video--show .video__img{\n            opacity: 0;\n            filter: alpha(opacity=0);\n        }\n    </style>\n'));

var XeeVideo = function (_XeeMedia) {
    _inherits(XeeVideo, _XeeMedia);

    function XeeVideo(opt) {
        _classCallCheck(this, XeeVideo);

        var _this = _possibleConstructorReturn(this, (XeeVideo.__proto__ || Object.getPrototypeOf(XeeVideo)).call(this, opt));

        if (opt.ele) {
            _this.$media = $(opt.ele);
            opt.img && _this.__initDOM__(opt);
        } else {
            _this.$media = $('<video src="' + opt.src + '">');
        }

        if (_XeeMedia3["default"].IS_SUPPORT_MEDIA) {
            _this.__init__();
            _this.onDone(function () {
                _this.$wrapper && _this.$wrapper.addClass('video--show');
            });
        }
        return _this;
    }

    _createClass(XeeVideo, [{
        key: '__initDOM__',
        value: function __initDOM__(opt) {
            var media = this.$media[0];
            var className = media.className;

            if (!_XeeMedia3["default"].IS_SUPPORT_MEDIA && !!opt.img) {
                this.$media.append($('<img class="video__img" src="' + opt.img + '">'));

                return false;
            }

            media.className = '';
            this.$wrapper = $('<div class="video__wrapper ' + className + '">');
            this.$wrapper.append($('<img class="video__img" src="' + opt.img + '">'));
            this.$wrapper.insertAfter(this.$media);
            this.$media.detach();
            this.$wrapper.prepend(this.$media.addClass('video__main'));
        }
    }]);

    return XeeVideo;
}(_XeeMedia3["default"]);

XeeVideo.IS_SUPPORT_MEDIA = _XeeMedia3["default"].IS_SUPPORT_MEDIA;
XeeVideo.PLAY_THROUGH = _XeeMedia3["default"].PLAY_THROUGH;
XeeVideo.CAN_PLAY = _XeeMedia3["default"].CAN_PLAY;
XeeVideo.version = _package.version;

exports["default"] = XeeVideo;
module.exports = exports['default'];