import cssList from "./cssList";
import {humpToLine} from "./sytleRender";

export interface mediaCondition {
    maxWidth?: number|string,
    maxHeight?: number|string,
}

export interface mediaConfig {
    condition: mediaCondition,
}

const useMedia = function (config: mediaConfig, styleList: cssList) {
    // console.log(DomName, itemName, styleList);
    // let dom = getDom(DomName + ".media." + itemName);
    // if(!dom){
    //     return false;
    // }
    // let mediaItem;
    // let config = styleList?.config ?? "";
    // if(config === ""){
    //     console.error("css " + DomName + " media item " + itemName + " have not config");
    //     return false;
    // }
    // let mediaType = config?.mediaType ?? "";
    // if(mediaType !== ""){
    //     mediaItem = "@media " + mediaType + " and (";
    // } else {
    //     mediaItem = "@media screen and (";
    // }
    // let condition = config?.condition ?? "";
    // if(condition === ""){
    //     console.error("css " + DomName + " media item " + itemName + " have not condition");
    //     return false;
    // }
    // //生成condition
    // let conditionKeys = Object.keys(condition);
    // for (let i = 0; i < conditionKeys.length; i++) {
    //     let key = humpToLine(conditionKeys[i]);
    //     let value;
    //     if(typeof condition[conditionKeys[i]] === "number"){
    //         value = condition[conditionKeys[i]] + "px";
    //     } else {
    //         value = condition[conditionKeys[i]];
    //     }
    //     mediaItem += key + ":" + value;
    //     if(i !== conditionKeys.length - 1){
    //         mediaItem += " and ";
    //     }
    // }
    // mediaItem += "){ " + "." + DomName + "{";
    // let style = styleList?.style ?? {};
    // let styleListKeys = Object.keys(style);
    // for (let i = 0; i < styleListKeys.length; i++) {
    //     let key = styleListKeys[i];
    //     let value = style[styleListKeys[i]];
    //     mediaItem += getCssStr(key, value);
    // }
    // mediaItem += "}}";
    // dom.innerHTML = mediaItem;
}

const getAutoFontSize = function (fontSize: number) {

    let w = document.body.clientWidth;
    let al = w / 1250;
    return fontSize * al - 1;
}

export {
    useMedia,
    getAutoFontSize
};
