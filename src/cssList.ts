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
    width: (value: any) => {return {width: value + "px", height: value + 30 + "px"}}
};



export default cssList;
