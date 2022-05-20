import { cssMethod } from "./cssList";
import autoCompatible from "./autoCompatible";
import { readSuffix } from "./cssSuffix";
//渲染主CSS
//主函数，跟据key特征分配渲染方式
const render = function(DomName: string,StyleMap: any){

    //优先进行模式匹配
    const pattern = /[\[](.*)[\]]/;
    let strMatch = DomName.match(pattern);
    if(strMatch !== null){
        //模式匹配
        strMatchRender(strMatch[1], StyleMap);
        return false;
    }

    const dom = getDom(DomName);
    if(!dom){
        return false;
    }
    const styleKey = Object.keys(StyleMap);
    let styleList = "." + DomName + "{";
    for(let i=0; i < styleKey.length; i++){
        let itemName = styleKey[i];
        //父节点直接跳过
        if(["fatherNode", "autoGroup"].includes(itemName.toString())){
            continue;
        }
        //伪元素
        if(itemName.toString().indexOf("__") === 0 || itemName.toString().indexOf("_") === 0){
            //进入伪元素渲染队列
            pseudoRender(DomName, itemName.toString(), StyleMap[itemName]);
            continue;
        }
        //子元素
        if(itemName.toString() === "children"){
            childRender(DomName, StyleMap[itemName]);
            continue;
        }
        //media媒体查询元素
        if(itemName.toString() === "media"){
            let mediaList = Object.keys(StyleMap[itemName]);
            console.log(mediaList);
            for (let j = 0; j < mediaList.length; j++) {
                let mediaName = mediaList[j];
                mediaRender(DomName, mediaName, StyleMap[itemName][mediaName]);
            }

            continue;
        }
        //默认渲染队列
        styleList += getCssStr(itemName, StyleMap[itemName]);
    }
    styleList += "}";
    dom.innerHTML = styleList;
}

//渲染伪元素CSS
const pseudoRender = function (DomName: string, pseudoType: string, pseudoMap: any){
    let pseudoSymbol,pseudoName;
    if(pseudoType.indexOf("__") === 0){
        //双点
        pseudoSymbol = "::";
        pseudoName = pseudoType.split("__")[1];
    } else {
        pseudoSymbol = ":";
        pseudoName = pseudoType.split("_")[1];
    }

    const styleKey = Object.keys(pseudoMap);
    let pseudoList = "." + DomName + pseudoSymbol + pseudoName + "{";
    for(let i=0; i < styleKey.length; i++){
        if(styleKey[i].toString() === "fatherNode"){
            continue;
        }
        pseudoList += getCssStr(styleKey[i], pseudoMap[styleKey[i]]);
    }
    pseudoList += "}";
    let dom = getDom(DomName + "." + pseudoType);
    if(!dom){
        return false;
    }
    dom.innerHTML = pseudoList;
    return pseudoList;
}

const strMatchRender = function (cssName: string, cssMethod: Function){
    let split = cssName.split("?");
    //对cssName操作，并进行渲染
    cssMethod("123");
}

const mediaRender = function (DomName: string,itemName: string, styleList: Object){
    window.cssLazy[DomName]["autoGroup"][itemName] = styleList;
    console.log(window.cssLazy[DomName]);
    let target;
    window.onresize = function (){
        if (target) {
            clearTimeout(target);
        }
        target = setTimeout(function() {
            console.log(document.body.clientWidth);
            let access = 0;
            target = null;
        }, 100);
    }
}

//渲染子元素CSS
const childRender = function (fatherNode: string, childList: any){
    let keys = Object.keys(childList);
    for (let i = 0; i < keys.length; i++) {
        let childName = keys[i];
        let dom = getDom(fatherNode + "." + childName);
        if(!dom){
            return false;
        }
        let childStyle = childList[keys[i]];
        let childValue = "." + fatherNode + " ." + childName + "{";
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
    childRender
};
