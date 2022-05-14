import { cssMethod } from "./cssList";
import autoCompatible from "./autoCompatible";

const render = function(DomName: string,StyleMap: any){
    const dom = getDom(DomName);
    if(!dom){
        return false;
    }
    const styleKey = Object.keys(StyleMap);
    let styleList = "." + DomName + "{";
    for(let i=0; i < styleKey.length; i++){
        if(StyleMap[styleKey[i]] === "fatherNode"){
            break;
        }
        styleList += getCssStr(styleKey[i], StyleMap[styleKey[i]]);
    }
    styleList += "}";
    dom.innerHTML = styleList;
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
        if(typeof styleValue === "number"){
            styleValue = styleValue + "px";
        }
        let autoValue = autoCompatible(styleName);
        let lowerName = humpToLine(styleName);
        let result = lowerName + ":" + styleValue + ";";
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

export default render;
