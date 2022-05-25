import cssList from "./cssList";
import {pseudoRender, render} from "./sytleRender";
//定义全局对象
declare global {
    interface Window {
        cssLazy: any,
        cssUnit: any,
        cssLazy_Beta: any
    }
}

const createElement = function (fatherNode: string,cssList: cssList, namespace?: string){
    //create namespace
    if(namespace !== undefined){
        createNameSpace(namespace);
    } else {
        namespace = "";
    }

    let cssListKey = Object.keys(cssList);
    for (let i = 0; i < cssListKey.length; i++) {
        let key = cssListKey[i];
        if(key === "children"){
            //遍历children，分别创建
            continue;
        }
        if(key.indexOf("_") === 0){
            //直接创建
            cssList[key]['fatherNode'] = fatherNode + "." + key;
            cssList[key] = new Proxy(cssList[key], {
                set: function (target, property, value, receiver) {
                    if (property === "fatherNode") {
                        return false;
                    }
                    target[property] = value;
                    let split = target['fatherNode'].split(".");

                    pseudoRender(split[0], split[1], target,namespace);
                    return true;
                }
            });
        }
    }
    cssList.fatherNode = fatherNode;
    cssList.namespace = namespace;
    render(fatherNode, cssList, namespace);
    window.cssLazy.__style[namespace][fatherNode] = new Proxy(cssList, {
        set(target, p: string | symbol, value: any): boolean {
            if (p === "fatherNode") {
                return false;
            }
            target[p] = value;
            render(target['fatherNode'] ?? "", target, target['namespace']);
            return true;
        },
        get(target, p: string | symbol): any {
            return target[p];
        }
    })
}

const createNameSpace = function (name: string){
    //创建命名级单位表
    let unitSheet = new Proxy({}, {
        set(target: {}, p: string | symbol, value: any): boolean {
            target[p] = value;
            return true;
        },
        get(target: {}, p: string | symbol): any {
            return target[p];
        }
    });

    let namespace = {
        unitSheet
    }

    window.cssLazy.__style[name] = new Proxy({}, {
        set(target, p, value) {
            target[p] = value;
            return true;
        },
        get(target, p) {
            return target[p];
        }
    })
}
/**
 * method 1: use array in under
 */
const windowObjectInit = function (){

    //默认的命名空间 单独创建
    let ns_default = new Proxy({}, {
        set(target, p, value) {
            target[p] = value;
            return true;
        },
        get(target, p) {
            return target[p];
        }
    })

    //style
    let __style = new Proxy({__default: ns_default}, {
        set(target, p, value) {
            target[p] === undefined || target[p] === null ? target['__default'][p] = value : target[p] = value;
            return true;
        },
        get(target, p) {
            return target[p] === undefined || target[p] === null ? target['__default'][p] : target[p];
        }
    });

    //media
    let __media = new Proxy({}, {
        set(target: {}, p: string | symbol, value: any, receiver: any): boolean {
            return true;
        },
        get(target: {}, p: string | symbol, receiver: any): any {
        }
    })

    //全局变量
    window.cssLazy = new Proxy({__style, __media}, {
        set(target, p, value) {
            target[p] === undefined || target[p] === null ? target['__style'][p] = value : target[p] = value;
            return true;
        },
        get(target, p) {
            return target[p] === undefined || target[p] === null ? target['__style'][p] : target[p];
        }
    });
}
export {
    windowObjectInit,
    createElement
}
