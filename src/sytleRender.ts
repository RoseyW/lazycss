import {cssMethod, cssMethods} from "./cssList";

const render = function(DomName: string,StyleMap: any, cssMethods?: cssMethods){
    const dom = getDom(DomName);
    if(!dom){
        console.error("can't found dom '" + DomName + "'");
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
const getCssStr = function (styleName: string, styleValue: any, cssMethods?: cssMethods) {
    let keys = Object.keys(cssMethod);
    if(keys.includes(styleName)){
        let value = cssMethod[styleName](styleValue);
        let valueKey = Object.keys(value);
        let resultStr = "";
        for (let i = 0; i < valueKey.length; i++) {
            resultStr += valueKey[i] + ":" + value[valueKey[i]] + ";";
        }
        return resultStr;
    } else {
        let element = humpToLine(styleName);
        if(typeof styleValue === "number"){
            styleValue = styleValue + "px";
        }
        return element + ":" + styleValue + ";";
    }
}

const getDom = function (tagName: string){
    let tagStyles = document.getElementsByTagName("styles");
    let __tagStyles: Element;
    if(tagStyles.length > 0){
        __tagStyles = tagStyles[0];
    } else {
        console.error("find a error");
        return;
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

export default render;
