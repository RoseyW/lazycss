import cssList from "./cssList";
import {pseudoRender, render} from "./sytleRender";

declare global {
    interface Window {
        cssLazy: any,
        cssUnit: any
    }
}

//基础proxy定义
const setBaseProxy = function(){
    window.cssUnit = Object.create({});
    window.cssLazy = new Proxy({}, {
        set: function (target, property, value, receiver) {
            if(value === "" || value === undefined || value === null){
                return false;
            }
            target[property] = value;
            render(typeof property === "string" ? property : property.toString(), value);
            return true;
        }
    });
    return true;
}

//创建元素代理
//创建多级元素代理
//顶级元素
//伪元素
//子元素
const createElementProxy = function (fatherNode: string,cssList: cssList){
    //先解析cssList，然后for循环找children和_和__关键字，分别添加Proxy
    let cssListKey = Object.keys(cssList);
    for (let i = 0; i < cssListKey.length; i++) {
        let key = cssListKey[i];
        if(key === "children"){
            //遍历children，分别创建
            continue;
        }
        if(key.indexOf("_") === 0 || key.indexOf("__") === 0){
            //直接创建
            cssList[key]['fatherNode'] = fatherNode + "." + key;
            cssList[key] = new Proxy(cssList[key], {
                set: function (target, property, value, receiver) {
                    if (property === "fatherNode") {
                        return false;
                    }
                    target[property] = value;
                    let split = target['fatherNode'].split(".");
                    pseudoRender(split[0], split[1], target);
                    return true;
                }
            });
        }
    }
    cssList.fatherNode = fatherNode;
    return new Proxy(cssList, {
        set: function (target, property, value, receiver) {
            if (property === "fatherNode") {
                return false;
            }
            target[property] = value;
            render(target['fatherNode'], target);
            return true;
        }
    });
}

//初始化
const init = function (){
    if(document.getElementsByTagName("styles").length === 0){
        setBaseProxy();
        let styles = document.createElement("styles");
        let selfStyle = document.createElement("style");
        selfStyle.innerHTML = "styles{display:none}";
        styles.appendChild(selfStyle);
        document.body.appendChild(styles);
    }
}

//主函数
const useStyle = function ({...args}: cssList){
    //初始化
    init();
    let mapArgs = Object.entries(args);
    for (let i =0; i < mapArgs.length; i++) {
        render(mapArgs[i][0], mapArgs[i][1]);
        window.cssLazy[mapArgs[i][0]] = createElementProxy(mapArgs[i][0],mapArgs[i][1]);
    }
    return window.cssLazy;
}

export {
    useStyle,
    init,
    createElementProxy
};
