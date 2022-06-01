import { cssList } from "./interface/styleSheet";
import {createElement, windowObjectInit} from "./styleGlobal";
import {globalReactive} from "./styleReactive";
import {refreshMedia} from "./styleMedia";

//初始化
const globalInit = function (){
    if(document.getElementsByTagName("styles").length === 0){
        windowObjectInit();
        globalReactive();

        //挂载watch函数
        //appendWatch();
        window.cssUnit = Object.create({});
        let styles = document.createElement("styles");
        let selfStyle = document.createElement("style");
        selfStyle.innerHTML = "styles{display:none}";
        styles.appendChild(selfStyle);
        document.body.appendChild(styles);
    }
}

// const appendWatch = function (){
//     watchEffect(refreshMedia);
// }

//主函数
const useStyle = function ({...args}: cssList, namespace ?: string, presetStyle ?: Object){
    globalInit();
    //初始化
    let mapArgs = Object.entries(args);
    for (let i =0; i < mapArgs.length; i++) {
        createElement(mapArgs[i][0],mapArgs[i][1], namespace);
    }
    return window.cssLazy;
}

export {
    useStyle,
    globalInit
};
