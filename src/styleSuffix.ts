//从window中读取制定名称的单位，若没有则返回空

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

export {
    readSuffix
}
