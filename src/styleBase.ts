import cssList from "./cssList";
import render from "./sytleRender";

declare global {
    interface Window {
        cssLazy: any
    }
}

//基础proxy定义
const setBaseProxy = function(){
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
const createElementProxy = function (fatherNode: string,cssList: cssList){
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
