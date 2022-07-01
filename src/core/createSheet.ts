import {  namespace } from "./namespace";
import { render } from "./render";
import {windowObjectInit} from "../styleGlobal";

const createSheet = function (cssSheet: Object){
    windowObjectInit();

    return {
        namespace,
        render
    };
}

export {
    createSheet
}