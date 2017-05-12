'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var count = 0; // 设置唯一ID用

var utils = {
    IS_WEIXIN: _testUserAgent([/micromessenger/i]),

    IS_YIXIN: _testUserAgent([/yixin/i]),

    IS_PC: !_testUserAgent([/Android/i, /iPhone/i, /SymbianOS/i, /Windows Phone/i, /iPad/i, /iPod/i]),

    IS_IOS: _testUserAgent([/iPhone/i, /iPad/i, /iPod/i]),

    IS_ANDROID: _testUserAgent([/Android/i]),

    ANIMATION_NAME: _getStyleProperty(['animation']),

    TRANSITION_NAME: _getStyleProperty(['transition']),

    TRANSFORM_NAME: _getStyleProperty(['transform']),

    noop: function noop() {},

    getUniqueID: function getUniqueID() {
        return new Date().getTime().toString(36).toUpperCase() + '' + (Math.random() * 10e16).toString(36).toUpperCase() + count++;
    },

    getStyleProperty: _getStyleProperty,

    testUserAgent: _testUserAgent,

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

    RAF: function RAF(cb) {
        utils.RAF = (window.requestAnimationFrame || function (cb) {
            return setTimeout(cb, 1000 / 60);
        }).bind(window);
        return utils.RAF(cb);
    },

    cancelRAF: function cancelRAF(id) {
        utils.cancelRAF = (window.cancelAnimationFrame || function (id) {
            return clearTimeout(id);
        }).bind(window);
        return utils.cancelRAF(id);
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

function _testUserAgent(testArr) {
    if (typeof window == 'undefined') return false;

    var userAgentInfo = window.navigator.userAgent;
    for (var v = 0; v < testArr.length; v++) {
        if (testArr[v].test(userAgentInfo)) {
            return true;
        }
    }

    return false;
}

function _getStyleProperty(testPropArr) {
    if (typeof document == 'undefined') return false;

    var divStyle = document.createElement('div').style;

    for (var i = 0, l = testPropArr.length; i < l; i++) {
        if (divStyle[testPropArr[i]] != undefined) {
            return testPropArr[i];
        }
    }
    return false;
}
module.exports = exports['default'];