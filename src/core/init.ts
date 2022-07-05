import {create} from "./create";
declare global {
    interface Window {
        Lazy: any
    }
}


const init = function (){
    window.Lazy = {
        _global: {}, //存放命名空间
        _effect: [], //监听体
        _plugin: [], //插件表
        _setting: {}
    };
    let c = create.namespace("_default");
    c.tags();
}




export {
    init
}