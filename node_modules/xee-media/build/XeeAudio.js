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

var XeeAudio = function (_XeeMedia) {
    _inherits(XeeAudio, _XeeMedia);

    function XeeAudio(opt) {
        _classCallCheck(this, XeeAudio);

        var _this = _possibleConstructorReturn(this, (XeeAudio.__proto__ || Object.getPrototypeOf(XeeAudio)).call(this, opt));

        if (opt.ele) {
            _this.$media = $(opt.ele);
        } else {
            _this.$media = $('<audio src="' + opt.src + '">');
            _this.__getWrapper__().append(_this.$media);
        }

        _XeeMedia3["default"].IS_SUPPORT_MEDIA && _this.__init__();
        return _this;
    }

    _createClass(XeeAudio, [{
        key: '__getWrapper__',
        value: function __getWrapper__() {
            var $wrapper = $('.myAudio--wrapper');

            if (!$wrapper[0]) {
                $wrapper = $('<div>').addClass('myAudio--wrapper').css({
                    display: 'none'
                }).appendTo('body');
            }

            return $wrapper;
        }
    }]);

    return XeeAudio;
}(_XeeMedia3["default"]);

XeeAudio.IS_SUPPORT_MEDIA = _XeeMedia3["default"].IS_SUPPORT_MEDIA;
XeeAudio.PLAY_THROUGH = _XeeMedia3["default"].PLAY_THROUGH;
XeeAudio.CAN_PLAY = _XeeMedia3["default"].CAN_PLAY;
XeeAudio.version = _package.version;

exports["default"] = XeeAudio;
module.exports = exports['default'];