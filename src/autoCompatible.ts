//自动兼容表，使用驼峰命名
export const List = [
    "animationDelay"
];

const autoCompatible = function(cssName: string){
    return List.includes(cssName);
}

export default autoCompatible;
