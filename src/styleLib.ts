import cssList from "./cssList";
import {createElementProxy, init} from "./styleBase";

export interface styleLib {
    namespace: string,
    cssList: Object
}

const useLib = function (lib: styleLib){
    init();
    let {namespace, cssList} = lib;
    let keys = Object.keys(cssList);
    for (let i = 0; i < keys.length; i++) {
        window.cssLazy[keys[i]] = createElementProxy(keys[i],cssList[keys[i]]);
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
