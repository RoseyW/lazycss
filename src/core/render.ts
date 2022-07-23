import {create} from "./create";

const render = function ({ ...config }){
    //config 配置
    let namespace = config?.namespace ?? "_default";
    let c = create.namespace(namespace);
    let units = config?.unit ?? {};
    if(units !== {}){
        let unitKey = Object.keys(units);
        for (let i = 0; i < unitKey.length; i++) {
            c.unit(unitKey[i], units[unitKey[i]]);
        }
    }

    let methods = config?.method ?? {};
    if(methods !== {}){
        let methodKey = Object.keys(methods);
        for (let i = 0; i < methodKey.length; i++) {
            c.method(methodKey[i], methods[methodKey[i]]);
        }
    }

    c.sheet(c.element(window.Lazy._sheet));
    delete window.Lazy._sheet;
    delete window.Lazy._namespace;
    console.log(window.Lazy);
}



export {
    render
}
