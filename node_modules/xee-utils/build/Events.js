'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Events = function () {
    function Events() {
        _classCallCheck(this, Events);

        this._events = {};
    }

    _createClass(Events, [{
        key: 'on',
        value: function on(eventName, callback) {
            if (!this._events[eventName]) {
                this._events[eventName] = {};
            }

            this._events[eventName][_utils2["default"].getUniqueID()] = callback;

            return this;
        }
    }, {
        key: 'off',
        value: function off(eventName, callback) {
            if (!_utils2["default"].isString(eventName)) {
                this._events = {};
                return this;
            }

            if (!this._events[eventName]) {
                return this;
            }

            if (!_utils2["default"].isFunction(callback)) {
                this._events[eventName] = {};
                return this;
            }

            var cache = this._events[eventName];
            for (var name in cache) {
                if (cache[name] === callback) {
                    delete cache[name];
                    return this;
                }
            }
        }
    }, {
        key: 'emit',
        value: function emit(eventName) {
            if (!this._events[eventName]) {
                return this;
            }

            var args = Array.prototype.slice.call(arguments, 1);
            var cache = this._events[eventName];

            for (var name in cache) {
                cache[name].apply(this, args);
            }

            return this;
        }
    }]);

    return Events;
}();

exports["default"] = Events;
module.exports = exports['default'];