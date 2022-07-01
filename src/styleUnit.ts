import {globalInit} from "./styleBase";

const setUnit = function (name: string|Array<string>,unit: string,namespace:string = "__default"){
    //将name和unit挂载到window上
    globalInit();
    if(typeof name === "string"){
        window.cssLazy[namespace].__unit[name] = unit;
    } else if(name.length > 0){
        name.forEach((item: string) => {
            window.cssLazy[namespace].__unit[item] = unit;
        })
    }
}

// const setGlobalUnit = function (name: string|Array<string>,unit: string){
//     globalInit();
//     if(typeof name === "string"){
//         appendUnitToGlobal(name, unit);
//     } else if(name.length > 0){
//         name.forEach((item: string) => {
//             appendUnitToGlobal(item, unit);
//         })
//     }
// }
//
// const appendUnitToGlobal = function (name: string, unit: string,namespace?: string){
//     if(namespace === undefined){
//         window.cssLazy.__unit[name] = unit;
//     } else {
//         window.cssLazy[namespace].__unit[name] = unit;
//     }
// }

const readUnit = function (cssName: string, namespace?: string){

}

export {
    setUnit
};
