
const defaultSuffix = {};

const readSuffix = function (cssName: string){
    let unit = window.cssLazy.__unit; //global
    let keys = Object.keys(unit);
    console.log(keys, cssName);
    if(keys.includes(cssName)){
        console.log("units", unit[cssName]);
        return unit[cssName];
    } else {
        return "";
    }
}

const autoSuffix = function (cssName: string){

}

export { readSuffix }
