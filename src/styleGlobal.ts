import {oneChildRender, pseudoRender, render} from "./sytleRender";
import {Observe} from "./styleObserve";
//定义全局对象
declare global {
    interface Window {
        cssLazy: any,
        cssUnit: any
    }
}
/**
 * method 1: use array in under
 */

const windowObjectInit = function (){
    //style
    let __style = createFirstSheet({});
    //media
    let __media = createFirstSheet({});

    let __watch = [];

    window.cssLazy = new Proxy({__style, __media, __watch}, {
        set(target, p, value) {
            target[p] === undefined || target[p] === null ? target['__style'][p] = value : target[p] = value;
            return true;
        },
        get(target, p) {
            return target[p] === undefined || target[p] === null ? target['__style'][p] : target[p];
        }
    });

    window.cssLazy['$add'] = function (className: string, {...args}: Object, namespace?: string){
        createElement(className,args, namespace);
    }
    createNameSpace("__default");
    createMediaNamespace("__default");
}

const createElement = function (fatherNode: string,cssList: Object, namespace?: string){
    //create namespace
    namespace !== undefined ? createNameSpace(namespace) : namespace = "";
    let cssListKey = Object.keys(cssList);
    for (let i = 0; i < cssListKey.length; i++) {
        let key = cssListKey[i];
        if(key === "children"){
            //遍历children，分别创建
            let childElement = cssList[key];
            for (const childElementKey in childElement) {
                console.log(childElementKey);
                let pushValue = childElement[childElementKey];
                pushValue['fatherNode'] = fatherNode + "." + "children" + "." + childElementKey;
                cssList[key][childElementKey] = new Proxy(pushValue, {
                    set(target: any, p: string | symbol, value: any, receiver: any) {
                        if (p === "fatherNode") {
                            return false;
                        }
                        target[p] = value;
                        let split = target['fatherNode'].split(".children.");
                        oneChildRender(split[0], split[1], target);
                        return true;
                    }
                })
            }
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
    cssList['fatherNode'] = fatherNode;
    cssList['namespace'] = namespace;
    render(fatherNode, cssList, namespace);
    window.cssLazy.__style[namespace === "" ? "__default" : namespace][fatherNode] = new Proxy(cssList, {
        set(target, p: string | symbol, value: any): boolean {
            if (p === "fatherNode") {
                return false;
            }

            Observe(target['namespace'], fatherNode, p.toString(), target[p], value);

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
    if(name in window.cssLazy.__style){
        return;
    }
    let selfObject = {
        __unit: createUnitSheet(),
        __method: createMethodSheet()
    }
    window.cssLazy.__style[name] = new Proxy(selfObject, {
        set(target, p, value) {
            target[p] = value;
            return true;
        },
        get(target, p) {
            return target[p];
        }
    })
}

const createUnitSheet = function (){
    return new Proxy({},{
        set(target: {}, p: string | symbol, value: any): boolean {
            target[p] = value;
            return true;
        },
        get(target: {}, p: string | symbol): any {
            return target[p];
        }
    })
}

const createMethodSheet = function (){
    return new Proxy({},{
        set(target: {}, p: string | symbol, value: any): boolean {
            target[p] = value;
            return true;
        },
        get(target: {}, p: string | symbol): any {
            return target[p];
        }
    })
}

const createFirstSheet = function (obj){
    return new Proxy(obj, {
        set(target, p, value) {
            target[p] = value;
            return true;
        },
        get(target, p) {
            return target[p] === undefined || target[p] === null ? target['__default'][p] : target[p];
        }
    })
}

const createMediaNamespace = function (name: string){
    if(name in window.cssLazy.__media){
        return;
    }

    window.cssLazy.__media[name] = new Proxy({}, {
        set(target, p, value) {
            target[p] = value;
            return true;
        },
        get(target, p) {
            return target[p];
        }
    })
}

const createMediaElement = function (DomName: string, config: Object, styleSheet: Object, namespace:string = "__default"){
    namespace !== undefined ? createMediaNamespace(namespace) : namespace = "";
    window.cssLazy.__media[namespace][DomName] = {
        config,
        styleSheet
    }
}

export {
    windowObjectInit,
    createElement,
    createMediaNamespace,
    createMediaElement
}
