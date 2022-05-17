import {init} from "./styleBase";



const setUnit = function (name: string,unit: string){


    init();
    //将name和unit挂载到window上
    window.cssUnit[name] = unit;
    console.log(window.cssUnit);

}

export { setUnit };
