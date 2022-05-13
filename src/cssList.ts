interface cssList {
    width ?: number,
    height ?: number,
    marginTop ?: number,
    marginLeft ?: number,
    marginRight ?: number,
    marginBottom ?: number,
    color ?: string,
    backgroundColor ?: string,
    backgroundUrl ?: string,
}

export interface cssMethods {
    method: Array<cssMethod>
}

export interface cssMethod {
    cssName: string,
    result: string|number|Function|boolean
}

//该函数允许用户使用object列表形式导入私有样式库
// export const createMethod = function ({...args}): cssMethods {
//     return methods;
// }
//返回一个map
export const cssMethod = {
    width: (value: any) => {return { width: typeof value === "number" ? value + "px" : value }},
    height: (value: any) => {return { height: typeof value === "number" ? value + "px" : value }},
    color: (value: any) => {return { color: value }},
    autoFlex: (value: any) => { return autoFlexMethods(value) },
    animation: (value: any) => {return { animation: value }},
    animationDelay: (value: any) => {return { animationDelay: value }},
};

const autoFlexMethods = function (value: any){
    let result = {};
    let split = value.split(" ");
    if(split.length === 2){
        //存在两个
        result = {
            display: "flex",
            justifyContent: split[0],
            alignItems: split[1],
            alignContent: split[1],
        }
    } else {
        result = {
            display: "flex",
            justifyContent: value,
            alignItems: value,
            alignContent: value,
        }
    }

    return result;

}

export default cssList;
