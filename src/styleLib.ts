import cssList from "./cssList";
import {init} from "./styleBase";
import {createElement} from "./styleGlobal";

export interface styleLib {
    namespace: string,
    cssList: Object
}

const useLib = function (lib: styleLib){
    init();
    let {namespace, cssList} = lib;
    let keys = Object.keys(cssList);
    for (let i = 0; i < keys.length; i++) {
        //需要集成到window中
        createElement(keys[i],cssList[keys[i]], namespace);
    }
    return true;
}

const setStyleLib = function (namespace: string,{...args}:cssList): styleLib {
    return {
        namespace: namespace,
        cssList: args
    };
}

export { useLib, setStyleLib }
