
//自动兼容表，使用驼峰命名
export const List = [
    "animationDelay"
];

const autoCompatible = function(cssName: string){
    return List.includes(cssName);
}

const getCompatible = function(lowerName: string, styleValue: any) {
    let result = "-webkit-" + lowerName + ":" + styleValue + ";";
    result += "-moz-" + lowerName + ":" + styleValue + ";";
    result += "-o-" + lowerName + ":" + styleValue + ";";
    return result;
}

export {
    autoCompatible,
    getCompatible
}