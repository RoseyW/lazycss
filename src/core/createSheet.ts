import {  namespace } from "./namespace";
import { render } from "./render";
import {init} from "./init";
import { use } from "./use";

const createSheet = function (cssSheet: Object){
    init();
    window.Lazy._sheet = cssSheet;
    return {
        render,
        use
    };
}

export {
    createSheet
}