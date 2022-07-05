//所有创建的功能
import {Renderer} from "./renderer";
import {obs} from "./effect";

const create = {
    _namespace: "_default",
    namespace(name: string) {
        console.log(window.Lazy);
        this._namespace = name;
        if(window.Lazy._global[name] === undefined){
            let _method = {};
            let _unit = {};
            let _sheet = {};
            window.Lazy._global[name] = {
                _method,
                _unit,
                _sheet
            }
        }
        return this;
    },
    //create element
    element(elementObj: Object){
        let keys = Object.keys(elementObj);
        const proxyObj = {};
        for (let i = 0; i < keys.length; i++) {
            let keyValue = keys[i];
            elementObj[keyValue]["fatherNode"] = keyValue;
            elementObj[keyValue]["nameSpace"] = this._namespace;
            Renderer(keyValue, elementObj[keyValue], this._namespace);
            proxyObj[keyValue] = new Proxy(elementObj[keyValue], {
                set(target: any, p: string | symbol, value: any, receiver: any): boolean {
                    obs(p, target[p], value);
                    console.log(target);
                    console.log(1);
                    target[p] = value;
                    Renderer(target["fatherNode"], target, target["nameSpace"]);
                    return true;
                },
                get(target: any, p: string | symbol, receiver: any): any {
                    return target[p];
                }
            });
        }
        return proxyObj;
    },
    tags(){
        if(document.getElementsByTagName("lazy").length === 0){
            let styles = document.createElement("lazy");
            let selfStyle = document.createElement("style");
            selfStyle.innerHTML = "lazy{display:none;}";
            styles.appendChild(selfStyle);
            document.body.appendChild(styles);
        }
    },
    sheet(sheet: Object){
        window.Lazy._global[this._namespace]._sheet = sheet;
    },
    unit(unitName: string, unitValue: string){
        window.Lazy._global[this._namespace]._unit[unitName] = unitValue;
    },
    method(methodName: string, methodFunc: Function){
        window.Lazy._global[this._namespace]._method[methodName] = methodFunc;
    }
}

export {
    create
}