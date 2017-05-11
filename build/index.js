'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _package = require('../package.json');

var _preload = require('./preload');

var _preload2 = _interopRequireDefault(_preload);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_preload2["default"].version = _package.version;

exports["default"] = _preload2["default"];
module.exports = exports['default'];