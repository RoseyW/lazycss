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

// interface cssLazy {
//     styleSheet: styleSheet,
//     mediaSheet: mediaSheet,
// }
//
//
// interface styleSheet {
//     nameSpace: nameSpace,
//     unitSheet: unitSheet,
// }
//
// interface mediaSheet {
//     [index: string]: string,
// }
//
//
// interface nameSpace {
//     unitSheet: Object,
//     [index: string]: ProxyConstructor(),
// }
//
// interface unitSheet {
//     [index: string]: string
// }

const createElement = function (fatherNode: string,cssList: cssList, namespace?: string){
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
                    pseudoRender(split[0], split[1], target);
                    return true;
                }
            });
        }
    }
    cssList.fatherNode = fatherNode;
    render(fatherNode, cssList);
    window.cssLazy_Beta.__style[namespace ?? "__default"][fatherNode] = new Proxy(cssList, {
        set(target, p: string | symbol, value: any): boolean {
            console.log(554);
            if (p === "fatherNode") {
                return false;
            }
            target[p] = value;
            render(target['fatherNode'] ?? "", target);
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
        set(target: {}, p: string | symbol, value: any, receiver: any): boolean {
            target[p] = value;
            return true;
        },
        get(target: {}, p: string | symbol, receiver: any): any {
            return target[p];
        }
    });

    let namespace = {
        unitSheet
    }

    window.cssLazy_Beta.__style[name] = new Proxy({}, {
        set(target, p, value, receiver) {
            target[p] = value;
            return true;
        },
        get(target, p, receiver) {
            return target[p];
        }
    })
}

const windowObjectInit = function (){

    //默认的命名空间 单独创建
    let ns_default = new Proxy({}, {
        set(target, p, value, receiver) {
            target[p] = value;
            return true;
        },
        get(target, p, receiver) {
            console.log(111);
            return target[p];
        }
    })

    //style
    let __style = new Proxy({__default: ns_default}, {
        set(target, p, value, receiver) {
            target[p] === undefined || target[p] === null ? target['__default'][p] = value : target[p] = value;
            console.log(target,p,receiver);
            return true;
        },
        get(target, p, receiver) {
            return target[p] === undefined || target[p] === null ? target['__default'][p] : target[p];
        }
    });

    //media
    let media = new Proxy({}, {
        set(target: {}, p: string | symbol, value: any, receiver: any): boolean {
            return true;
        },
        get(target: {}, p: string | symbol, receiver: any): any {
        }
    })

    //全局变量
    window.cssLazy_Beta = new Proxy({__style, media}, {
        set(target, p, value, receiver) {
            target[p] === undefined || target[p] === null ? target['__style'][p] = value : target[p] = value;
            return true;
        },
        get(target, p, receiver) {
            return target[p] === undefined || target[p] === null ? target['__style'][p] : target[p];
        }
    });
}

export {
    windowObjectInit,
    createElement
}
