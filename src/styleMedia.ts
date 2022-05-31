import { cssList } from "./interface/styleSheet";
import {createMediaElement} from "./styleGlobal";

export interface mediaCondition {
    maxWidth?: number|string,
    maxHeight?: number|string,
}

export interface mediaConfig {
    condition: mediaCondition,
}

//将media设置加入到global中
const useMedia = function (DomName: string, config: mediaConfig, styleList: cssList, namespace: string = "__default") {

    createMediaElement(DomName, config, styleList, namespace);

}

const refreshMedia = function (width: number, height: number){}

export {
    useMedia,
    refreshMedia
};
