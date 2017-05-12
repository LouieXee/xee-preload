let count = 0; // 设置唯一ID用

const utils = {
    IS_WEIXIN: _testUserAgent([/micromessenger/i]),

    IS_YIXIN: _testUserAgent([/yixin/i]),

    IS_PC: !_testUserAgent([/Android/i, /iPhone/i, /SymbianOS/i, /Windows Phone/i, /iPad/i, /iPod/i]),

    IS_IOS: _testUserAgent([/iPhone/i, /iPad/i, /iPod/i]),

    IS_ANDROID: _testUserAgent([/Android/i]),

    ANIMATION_NAME: _getStyleProperty(['animation']),

    TRANSITION_NAME: _getStyleProperty(['transition']),

    TRANSFORM_NAME: _getStyleProperty(['transform']),

    noop: function () {},

    getUniqueID: function () {
        return new Date().getTime().toString(36).toUpperCase() + '' + (Math.random() * 10e16).toString(36).toUpperCase() + count++;
    },

    getStyleProperty: _getStyleProperty,

    testUserAgent: _testUserAgent,

    isString: function (target) {
        return _getType(target) === '[object String]';
    },

    isNumber: function (target) {
        return _getType(target) === '[object Number]';
    },

    isFunction: function (target) {
        return _getType(target) === '[object Function]';
    },

    isObject: function (target) {
        return _getType(target) === '[object Object]';
    },

    isArray: function (target) {
        return _getType(target) === '[object Array]';
    },

    isBoolean: function (target) {
        return _getType(target) === '[object Boolean]';
    },

    RAF: function (cb) {
        utils.RAF = (window.requestAnimationFrame
                        || function (cb) {
                            return setTimeout(cb, 1000 / 60);
                        }).bind(window);
        return utils.RAF(cb);
    },

    cancelRAF: function (id) {
        utils.cancelRAF = (window.cancelAnimationFrame
                            || function (id) {
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
    template: function (tmpl, data) {
        return tmpl.replace(/\{%([a-zA-Z0-9]+)%\}/g, function (match, name) {
            return data[name];
        })
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
    loadScript: function (opt) {
        return new Promise((resolve, reject) => {
            let script = document.createElement('script');
            if (script.readyState) { // IE
                script.onreadystatechange = function () {
                    if (script.readyState == 'loaded' || script.readyState == 'complete') { 
                        script.onreadystatechange = null; 
                        resolve();
                    } 
                };
            } else {    // Others
                script.onload = function () {  
                    resolve();
                }; 
            }

            script.type = 'text/javascript';
            script.src = (this.isString(opt) && opt) || (this.isObject(opt) && opt.src);

            this.isString(opt.charset) && (script.charset = opt.charset);
            
            document.getElementsByTagName('head')[0].appendChild(script);
        })
    },

    /*
        加载css文件
        @mehotd loadStyle
        @param {Object || String} opt 当是对象时则为配置对象，当是字符串时则为文件路径
        @param {String} opt.href
        @param {Function} opt.success
        @return {Promise}
    */
    loadStyle: function (opt) {
        return new Promise((resolve, reject) => {
            let link = document.createElement('link');
            link.onload = function () {
                resolve();
            };

            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = (this.isString(opt) && opt) || (this.isObject(opt) && opt.href);
            document.getElementsByTagName('head')[0].appendChild(link);
        })
    },
};

export default utils;

function _getType (target) {
    return Object.prototype.toString.call(target);
}

function _testUserAgent (testArr) {
    if (typeof window == 'undefined') return false;

    let userAgentInfo = window.navigator.userAgent;  
    for (let v = 0; v < testArr.length; v++) {  
        if (testArr[v].test(userAgentInfo)) { 
            return true;
        }  
    }  

    return false;  
}

function _getStyleProperty (testPropArr) {
    if (typeof document == 'undefined') return false;

    let divStyle = document.createElement('div').style;
    
    for (let i = 0, l = testPropArr.length; i < l; i++) {
        if (divStyle[testPropArr[i]] != undefined) {
            return testPropArr[i];
        }
    }
    return false;
}
