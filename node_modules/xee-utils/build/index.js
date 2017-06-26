'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _package = require('../package.json');

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var _support = require('./support');

var _support2 = _interopRequireDefault(_support);

var _browser = require('./browser');

var _browser2 = _interopRequireDefault(_browser);

var _Base = require('./Base');

var _Base2 = _interopRequireDefault(_Base);

var _Events = require('./Events');

var _Events2 = _interopRequireDefault(_Events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_utils2["default"].version = _package.version;

_utils2["default"].Base = _Base2["default"];
_utils2["default"].Events = _Events2["default"];
_utils2["default"].support = _support2["default"];
_utils2["default"].browser = _browser2["default"];

exports["default"] = _utils2["default"];
module.exports = exports['default'];