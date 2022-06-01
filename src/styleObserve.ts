//监听函数
import {humpToLine} from "./sytleRender";

const Observe = async function (namespace: string = "__default", elementName: string, itemName: string, oldValue: any, latestValue: any){
    namespace = namespace === "" ? "__default" : namespace;
    let effect = window.cssLazy.__watch;
    for (let i = 0; i < effect.length; i++) {
        let item = effect[i];
        if(item.namespace === namespace && item.cssName === elementName && item.itemName === itemName){
            item.func(latestValue, oldValue);
        }
    }
}

//响应函数
const useEffect = function (elementName: string, func: Function){
    //namespace.cssName.elementName
    let split = elementName.split(".");
    console.log(split);
    let element = {
        namespace: "",
        cssName: "",
        itemName: "",
        func: func
    };
    if(split.length > 1){
        if(split.length === 2){
            //为默认的命名空间
            element.namespace = "__default";
            element.cssName = split[0];
            element.itemName = split[1];
        }
        if(split.length === 3){
            element.namespace = split[0];
            element.cssName = split[1];
            element.itemName = split[2];
        }
    }

    if(split.length === 1){
        let line = humpToLine(elementName).split("-");
        if(line.length >= 2){
            element.namespace = "__global";
            element.cssName = line[1];
            element.itemName = line[2];
        }
    }

    window.cssLazy.__watch.push(element);
}

export {
    Observe,
    useEffect
}
