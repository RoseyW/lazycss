"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
var useStyle = function (_a) {
    var args = __rest(_a, []);
    //初始化
    init();
    console.log(args);
    var mapArgs = Object.entries(args);
    console.log(mapArgs);
    var styleObjProxy = {};
    for (var i = 0; i < mapArgs.length; i++) {
        setStyleVal(mapArgs[i][0], mapArgs[i][1]);
        var proxyArgs = __assign({}, mapArgs[i][1]);
        proxyArgs['fatherNode'] = mapArgs[i][0];
        console.log(proxyArgs);
        styleObjProxy[mapArgs[i][0]] = new Proxy(proxyArgs, {
            set: function (target, property, value, receiver) {
                if (property === "fatherNode") {
                    console.error("can't set father node");
                    return;
                }
                target[property] = value;
                var styleMap = {};
                styleMap[property] = value;
                setStyleVal(target['fatherNode'], styleMap);
                console.log(target, property, receiver, value);
                console.log(Reflect.get(target, property, receiver));
                return Reflect.get(target, property, receiver);
            }
        });
    }
    //防止响应式篡改
    return new Proxy(styleObjProxy, {
        set: function (target, property, value, receiver) {
            return Reflect.get(target, property, receiver);
        }
    });
};
var init = function () {
    var styles = document.createElement("styles");
    var selfStyle = document.createElement("style");
    selfStyle.innerHTML = "styles{display:none}";
    styles.appendChild(selfStyle);
    document.body.appendChild(styles);
};
var getTagDom = function (tagName) {
    var tagStyles = document.getElementsByTagName("styles");
    var __tagStyles;
    if (tagStyles.length > 0) {
        __tagStyles = tagStyles[0];
    }
    else {
        console.error("find a error");
        return;
    }
    var tagStyle = __tagStyles.getElementsByTagName("style");
    for (var i = 0; i < tagStyle.length; i++) {
        if (tagStyle[i].getAttribute("name") === tagName) {
            return tagStyle[i];
        }
    }
    var newStyle = document.createElement("style");
    newStyle.setAttribute("name", tagName);
    __tagStyles.appendChild(newStyle);
    return newStyle;
};
var setStyleVal = function (DomName, StyleMap) {
    console.log(DomName);
    var dom = getTagDom(DomName);
    if (!dom) {
        console.error("can't found dom '" + DomName + "'");
        return false;
    }
    var styleKey = Object.keys(StyleMap);
    var styleList = "." + DomName + "{";
    console.log(styleKey);
    for (var i = 0; i < styleKey.length; i++) {
        var variable = "";
        if (typeof StyleMap[styleKey[i]] === "number") {
            variable = StyleMap[styleKey[i]] + "px";
        }
        else {
            variable = StyleMap[styleKey[i]];
        }
        styleList += styleKey[i] + ":" + variable + ";";
    }
    styleList += "}";
    dom.innerHTML = styleList;
};
exports["default"] = useStyle;
