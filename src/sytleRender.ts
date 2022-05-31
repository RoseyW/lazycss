import { cssMethod } from "./styleMethod";
import autoCompatible from "./autoCompatible";
import { readSuffix } from "./cssSuffix";
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
        styleList += getCssStr(itemName, StyleMap[itemName]);
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
        pseudoList += getCssStr(styleKey[i], pseudoMap[styleKey[i]]);
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
            childValue += getCssStr(key, childStyle[key]);
        }
        childValue += "}";
        dom.innerHTML = childValue;
    }
}

//到cssMethod里找，如果没有，则执行默认的值
const getCssStr = function (styleName: string, styleValue: any) {
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
        let autoSuffix = readSuffix(styleName);
        if(typeof styleValue === "number" && autoSuffix === ""){
            styleValue = styleValue + "px";
        }
        let autoValue = autoCompatible(styleName);
        let lowerName = humpToLine(styleName);
        let result = lowerName + ":" + styleValue + autoSuffix + ";";
        if(autoValue){
            getCompatibleValue(lowerName, styleValue);
        }
        return result;
    }
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
};
