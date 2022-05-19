import {init} from "./styleBase";

const setUnit = function (name: string|Array<string>,unit: string){
    init();
    //将name和unit挂载到window上
    if(typeof name === "string"){
        window.cssUnit[name] = unit;
    } else if(name.length > 0){
        name.forEach((item: string,index: number) => {
            window.cssUnit[item] = unit;
        })
    }
}

export { setUnit };
