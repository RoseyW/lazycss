import {humpToLine} from "./humpToLine";
import {getCompatible, autoCompatible} from "./compatible";
import {getMethods} from "./methods";

const Renderer = function (fatherNode: string, cssList: Object, namespace: string = "_default"){
    main();
    function main(){
        let dom = createStyleTag();
        if(!dom){
            return false;
        }
        let cssMapKey = Object.keys(cssList);
        let styleList = (namespace !== "_default" ? "." + namespace + "-" : ".") + fatherNode + "{";

        for(let i=0; i < cssMapKey.length; i++){
            let itemName = cssMapKey[i];
            //父节点直接跳过
            if(["fatherNode", "autoGroup", "nameSpace"].includes(itemName.toString())){
                continue;
            }
            //伪元素
            if(itemName.toString().indexOf("_") === 0){
                //进入伪元素渲染队列
                pseudo(fatherNode, itemName.toString(), cssList[itemName]);
                continue;
            }
            //子元素
            if(itemName.toString() === "child"){
                child(fatherNode, cssList[itemName]);
                continue;
            }
            //默认渲染队列
            styleList += createCSS(itemName, cssList[itemName]);
        }
        styleList += "}";
        dom.innerHTML = styleList;
    }

    function child(fatherNode: string, childList: any){
        let keys = Object.keys(childList);
        for (let i = 0; i < keys.length; i++) {
            let childName = keys[i];
            let dom = createStyleTag(childName);
            if(!dom){
                return false;
            }
            let childStyle = childList[keys[i]];
            let childValue = (namespace ? "." + namespace + "-" : ".") + fatherNode + " " + (namespace ? "." + namespace + "-" : ".") + childName + "{";
            let childStyleKey = Object.keys(childStyle);
            for (let j = 0; j < childStyleKey.length; j++) {
                let key = childStyleKey[j];
                childValue += createCSS(key, childStyle[key]);
            }
            childValue += "}";
            dom.innerHTML = childValue;
        }
    }

    function pseudo(DomName: string, pseudoType: string, pseudoMap: any){
        let pseudoName;
        pseudoName = pseudoType.split("_")[1];
        const styleKey = Object.keys(pseudoMap);
        let pseudoList = (namespace ? "." + namespace + "-" : ".") + DomName + ":" + pseudoName + "{";
        for(let i=0; i < styleKey.length; i++){
            if(styleKey[i].toString() === "fatherNode"){
                continue;
            }
            pseudoList += createCSS(styleKey[i], pseudoMap[styleKey[i]]);
        }
        pseudoList += "}";
        let dom = createStyleTag(pseudoType);
        if(!dom){
            return;
        }
        dom.innerHTML = pseudoList;
    }

    function createCSS(cssName, cssValue){
        //获取method
        let methodResult = getMethods(cssName, cssValue, namespace);
        let lowerName = humpToLine(cssName);
        let result = "";
        if(methodResult){
            console.log(methodResult);

            //循环输出
            if(methodResult instanceof Object){
                let keys = Object.keys(methodResult);
                for (let i = 0; i < keys.length; i++) {
                    let lowerName = humpToLine(keys[i]);
                    result += lowerName + ":" + methodResult[keys[i]] + ";";
                    let autoValue = autoCompatible(keys[i]); //返回需要适配的表
                    if(autoValue){
                        result += getCompatible(lowerName, methodResult[keys[i]]);
                    }
                }
                return result;
            }

            if(methodResult instanceof Array){
                let value;
                for (let i = 0; i < methodResult.length; i++) {
                    value += methodResult[i] + " ";
                }
                result += lowerName + ":" + value + ";";
                let autoValue = autoCompatible(cssName); //返回需要适配的表
                if(autoValue){
                    result += getCompatible(lowerName, value);
                }
                return result;
            }

            result += lowerName + ":" + methodResult + ";";
            let autoValue = autoCompatible(cssName); //返回需要适配的表
            if(autoValue){
                result += getCompatible(lowerName, cssValue);
            }
            return result;
        }

        //当method不起作用时，进行默认的css操作
        //默认的数值处理

        //获取unit

        if(cssValue instanceof Array){
            let value = "";
            for (let i=0; i < cssValue.length; i++) {
                const val = cssValue[i];
                value += val;
                if(typeof val === "number"){
                    value += "px";
                }
                if(i != cssValue.length - 1){
                    value += " ";
                }
            }
            cssValue = value;
        }

        if(typeof cssValue === "number"){
            cssValue = cssValue + "px";
        }

        let autoValue = autoCompatible(cssName);

        if(autoValue){
            getCompatible(lowerName, cssValue);
        }

        return lowerName + ":" + cssValue + ";";
    }

    function createStyleTag(addition?: string){
        let id;
        if(namespace === "_default"){
            id = fatherNode;
        } else {
            id = namespace + "." + fatherNode;
        }

        if(addition){
            id += "." + addition;
        }

        let tagStyles = document.getElementsByTagName("lazy");
        let __tagStyles: Element;
        if(tagStyles.length > 0){
            __tagStyles = tagStyles[0];
        } else {
            console.error("find a error");
            return false;
        }
        let tagStyle = __tagStyles.getElementsByTagName("style");
        for (let i = 0; i < tagStyle.length; i++){
            if(tagStyle[i].getAttribute("name") === id){
                return tagStyle[i];
            }
        }
        let newStyle = document.createElement("style");
        newStyle.setAttribute("name", id);
        __tagStyles.appendChild(newStyle);
        return newStyle;
    }
}

export {
    Renderer
}