import {cssMethod} from "./styleMethod";
import autoCompatible from "./autoCompatible";
import {readSuffix} from "./cssSuffix";
//渲染主CSS
//主函数，跟据key特征分配渲染方式
const render = async function(DomName: string,StyleMap: any, namespace ?: string){
    const dom = getDom((namespace ?? "") + "." + DomName);
    if(!dom){
        return false;
    }
    const styleKey = Object.keys(StyleMap);
    let styleList = (namespace ? "." + namespace + "-" : ".") + DomName + "{";
    for(let i=0; i < styleKey.length; i++){
        let itemName = styleKey[i];
        //父节点直接跳过
        if(["fatherNode", "autoGroup", "namespace"].includes(itemName.toString())){
            continue;
        }
        //伪元素
        if(itemName.toString().indexOf("_") === 0){
            //进入伪元素渲染队列
            pseudoRender(DomName, itemName.toString(), StyleMap[itemName], namespace);
            continue;
        }
        //子元素
        if(itemName.toString() === "children"){
            childRender(DomName, StyleMap[itemName]);
            continue;
        }
        //默认渲染队列
        styleList += getCssStr(itemName, StyleMap[itemName], namespace);
    }
    styleList += "}";
    dom.innerHTML = styleList;
}

//渲染伪元素CSS
const pseudoRender = async function (DomName: string, pseudoType: string, pseudoMap: any, namespace?: string){
    let pseudoName;
    pseudoName = pseudoType.split("_")[1];
    const styleKey = Object.keys(pseudoMap);
    let pseudoList = (namespace ? "." + namespace + "-" : ".") + DomName + ":" + pseudoName + "{";
    for(let i=0; i < styleKey.length; i++){
        if(styleKey[i].toString() === "fatherNode"){
            continue;
        }
        pseudoList += getCssStr(styleKey[i], pseudoMap[styleKey[i]], namespace);
    }
    pseudoList += "}";
    let dom = getDom((namespace ?? "") + "." + DomName + "." + pseudoType);
    if(!dom){
        return;
    }
    dom.innerHTML = pseudoList;
}

const strMatchRender = async function (cssName: string, cssMethod: Function){
    let split = cssName.split("?");
    //对cssName操作，并进行渲染
    cssMethod("123");
}

//渲染子元素CSS
const childRender = async function (fatherNode: string, childList: any, namespace?: string){
    let keys = Object.keys(childList);
    for (let i = 0; i < keys.length; i++) {
        let childName = keys[i];
        let dom = getDom((namespace ?? "") + "." + fatherNode + "." + childName);
        if(!dom){
            return false;
        }
        let childStyle = childList[keys[i]];
        let childValue = (namespace ? "." + namespace + "-" : ".") + fatherNode + " ." + childName + "{";
        let childStyleKey = Object.keys(childStyle);
        for (let j = 0; j < childStyleKey.length; j++) {
            let key = childStyleKey[j];
            childValue += getCssStr(key, childStyle[key], namespace);
        }
        childValue += "}";
        dom.innerHTML = childValue;
    }
}

const oneChildRender = async function (fatherNode: string, childName: string, cssList: Object, namespace?: string) {
    let dom = getDom((namespace ?? "") + "." + fatherNode + "." + childName);
    if(!dom){
        return false;
    }
    let childValue = (namespace ? "." + namespace + "-" : ".") + fatherNode + " ." + childName + "{";
    let childStyleKey = Object.keys(cssList);
    for (let j = 0; j < childStyleKey.length; j++) {
        let key = childStyleKey[j];
        childValue += getCssStr(key, cssList[key], namespace);
    }
    childValue += "}";
    dom.innerHTML = childValue;
}

//到cssMethod里找，如果没有，则执行默认的值
//cssMethod 仅对数值做处理，不对单位做处理，单位处理将会放在全局处理
//需要引入的有 readSuffix autoCompatible cssMethodDefault

const getCssStr = function (styleName: string, styleValue: any, styleNamespace: string = "__default") {
    if(styleName === "fatherNode"){
        return false;
    }

    let autoSuffix = getUnit(styleName, styleNamespace);
    let keys = Object.keys(cssMethod);
    if(keys.includes(styleName)){
        let value = cssMethod[styleName](styleValue);
        let valueKey = Object.keys(value);
        let resultStr = "";
        for (let i = 0; i < valueKey.length; i++) {
            //找到后进行查找自动装载
            let autoValue = autoCompatible(valueKey[i]); //返回需要适配的表
            let lowerName = humpToLine(valueKey[i]);
            resultStr += lowerName + ":" + value[valueKey[i]] + ";";
            if(autoValue){
                resultStr += getCompatibleValue(lowerName, value[valueKey[i]]);
            }
        }
        return resultStr;
    } else {
        //默认的数值处理
        console.log(autoSuffix);
        if(styleValue instanceof Array){
            let value = "";
            for (let i=0; i < styleValue.length; i++) {
                const val = styleValue[i];
                value += val;
                if(typeof val === "number" && autoSuffix === ""){
                    value += "px";
                }
                if(i != styleValue.length - 1){
                    value += " ";
                }
            }
            styleValue = value;
        }
    }

    if(typeof styleValue === "number" && autoSuffix === ""){
        styleValue = styleValue + "px";
    }

    let autoValue = autoCompatible(styleName);
    let lowerName = humpToLine(styleName);

    if(autoValue){
        getCompatibleValue(lowerName, styleValue);
    }

    return lowerName + ":" + styleValue + autoSuffix + ";";
}

const getUnit = function (cssName: string, namespace: string = "__default"){

    if(namespace === ""){
        namespace = "__default";
    }

    console.log("getUnit",window.cssLazy.__style[namespace], namespace);
    return window.cssLazy?.__style[namespace]?.__unit[cssName] ?? "px";
}

const getDom = function (tagName: string){
    let tagStyles = document.getElementsByTagName("styles");
    let __tagStyles: Element;
    if(tagStyles.length > 0){
        __tagStyles = tagStyles[0];
    } else {
        console.error("find a error");
        return false;
    }
    let tagStyle = __tagStyles.getElementsByTagName("style");
    for (let i = 0; i < tagStyle.length; i++){
        if(tagStyle[i].getAttribute("name") === tagName){
            return tagStyle[i];
        }
    }
    let newStyle = document.createElement("style");
    newStyle.setAttribute("name", tagName);
    __tagStyles.appendChild(newStyle);
    return newStyle;
}

const humpToLine = function(value: string) {
    return value.replace(/([A-Z])/g,"-$1").toLowerCase();
}

const getCompatibleValue = function(lowerName: string, styleValue: any) {
    let result = "-webkit-" + lowerName + ":" + styleValue + ";";
    result += "-moz-" + lowerName + ":" + styleValue + ";";
    result += "-o-" + lowerName + ":" + styleValue + ";";
    return result;
}

export {
    render,
    pseudoRender,
    childRender,
    humpToLine,
    getDom,
    oneChildRender
};
