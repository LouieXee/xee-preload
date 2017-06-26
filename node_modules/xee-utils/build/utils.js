'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var __count__ = 0; // 设置唯一ID用
var __style__ = document.createElement('div').style;

var utils = {
    getAvaliableProperty: function getAvaliableProperty(properties) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = properties[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var property = _step.value;

                if (typeof __style__[property] != 'undefined') {
                    return true;
                }
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator["return"]) {
                    _iterator["return"]();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        return false;
    },


    noop: function noop() {},

    getUniqueID: function getUniqueID() {
        return new Date().getTime().toString(36).toUpperCase() + '' + (Math.random() * 10e16).toString(36).toUpperCase() + __count__++;
    },

    isString: function isString(target) {
        return _getType(target) === '[object String]';
    },

    isNumber: function isNumber(target) {
        return _getType(target) === '[object Number]';
    },

    isFunction: function isFunction(target) {
        return _getType(target) === '[object Function]';
    },

    isObject: function isObject(target) {
        return _getType(target) === '[object Object]';
    },

    isArray: function isArray(target) {
        return _getType(target) === '[object Array]';
    },

    isBoolean: function isBoolean(target) {
        return _getType(target) === '[object Boolean]';
    },

    raf: function raf(cb) {
        utils.raf = (window.requestAnimationFrame || function (cb) {
            return setTimeout(cb, 1000 / 60);
        }).bind(window);

        utils.raf.cancel = (window.cancelAnimationFrame || function (id) {
            return clearTimeout(id);
        }).bind(window);

        return utils.raf(cb);
    },

    /*
        模板方法
        @method template
        @param {String} tmpl
        @param {Object} data
        @return {String}
    */
    template: function template(tmpl, data) {
        return tmpl.replace(/\{%([a-zA-Z0-9]+)%\}/g, function (match, name) {
            return data[name];
        });
    },

    /*
        加载js文件
        @method loadScript
        @param {Object || String} opt 当是对象时则为配置对象，当是字符串时则为文件路径
        @param {String} opt.src 文件路径
        @param {String} optional opt.charset 编码格式
        @param {Function} optional opt.success 成功回调
        @return {Promise}
    */
    loadScript: function loadScript(opt) {
        var _this = this;

        return new Promise(function (resolve, reject) {
            var script = document.createElement('script');
            if (script.readyState) {
                // IE
                script.onreadystatechange = function () {
                    if (script.readyState == 'loaded' || script.readyState == 'complete') {
                        script.onreadystatechange = null;
                        resolve();
                    }
                };
            } else {
                // Others
                script.onload = function () {
                    resolve();
                };
            }

            script.type = 'text/javascript';
            script.src = _this.isString(opt) && opt || _this.isObject(opt) && opt.src;

            _this.isString(opt.charset) && (script.charset = opt.charset);

            document.getElementsByTagName('head')[0].appendChild(script);
        });
    },

    /*
        加载css文件
        @mehotd loadStyle
        @param {Object || String} opt 当是对象时则为配置对象，当是字符串时则为文件路径
        @param {String} opt.href
        @param {Function} opt.success
        @return {Promise}
    */
    loadStyle: function loadStyle(opt) {
        var _this2 = this;

        return new Promise(function (resolve, reject) {
            var link = document.createElement('link');
            link.onload = function () {
                resolve();
            };

            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = _this2.isString(opt) && opt || _this2.isObject(opt) && opt.href;
            document.getElementsByTagName('head')[0].appendChild(link);
        });
    }
};

exports["default"] = utils;


function _getType(target) {
    return Object.prototype.toString.call(target);
}
module.exports = exports['default'];