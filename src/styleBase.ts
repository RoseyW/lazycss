import cssList from "./cssList";
import {createElement, windowObjectInit} from "./styleGlobal";

//初始化
const init = function (){
    if(document.getElementsByTagName("styles").length === 0){
        windowObjectInit();
        window.cssUnit = Object.create({});
        let styles = document.createElement("styles");
        let selfStyle = document.createElement("style");
        selfStyle.innerHTML = "styles{display:none}";
        styles.appendChild(selfStyle);
        document.body.appendChild(styles);
    }
}

//主函数
const useStyle = function ({...args}: cssList, namespace ?: string, presetStyle ?: Object){
    //初始化
    init();
    let mapArgs = Object.entries(args);
    for (let i =0; i < mapArgs.length; i++) {
        createElement(mapArgs[i][0],mapArgs[i][1], namespace);
    }
    return window.cssLazy;
}

export {
    useStyle,
    init
};
