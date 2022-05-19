
const defaultSuffix = {};

const readSuffix = function (cssName: string){
    let unit = window.cssUnit;
    let keys = Object.keys(unit);
    if(keys.includes(cssName)){
        return unit[cssName];
    } else {
        return "";
    }
}

const autoSuffix = function (cssName: string){

}

export { readSuffix }
