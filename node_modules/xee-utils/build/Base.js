"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// TODO 基础类，后续可能定义公共方法
var Base = function () {
    function Base() {
        _classCallCheck(this, Base);
    }

    _createClass(Base, [{
        key: "__fix_ie8__",


        // 如果没有定义方法并声明该类，则会报错 cannot call class as function
        value: function __fix_ie8__() {}
    }]);

    return Base;
}();

exports["default"] = Base;
module.exports = exports["default"];