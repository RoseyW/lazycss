const Methods = {
    width: (value: any) => {return { width: typeof value === "number" ? value : value }},
    height: (value: any) => {return { height: typeof value === "number" ? value : value }},
    color: (value: any) => {return { color: value }},
    autoFlex: (value: any) => { return autoFlexMethods(value) },
    animation: (value: any) => {return { animation: value }},
    animationDelay: (value: any) => {return { animationDelay: value }},
    fontSize: (value: any) => {return {fontSize: autoFontSize(value)}}
}

const getSystemMethods = function (name: string, value: any){
    let userMethod = Methods;
    let methodKey = Object.keys(userMethod);
    let includes = methodKey.includes(name);
    if(includes){
        return userMethod[name](value);
    }

    return false;
}

const getMethods = function (name: string, value: any, namespace: string = "_default"){
    let userMethod;
    let globalMethod = window.Lazy._global._default._method;
    userMethod = { ...globalMethod };
    if(namespace !== "_default"){
        let namespaceMethod = window.Lazy._global[namespace]._method;
        userMethod = { ...globalMethod,...namespaceMethod };
    }

    let methodKey = Object.keys(userMethod);
    let includes = methodKey.includes(name);
    if(includes){
        return userMethod[name](value);
    }
    return false;
}


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

const autoFontSize = function (fontSize: number) {
    let w = window.screen.width;
    let math = fontSize * 1800 / w;
    if(w < 660){
        math = math / 1.7;
    }
    math = Math.round(math);
    return math;
}

export {
    getSystemMethods,
    getMethods
}
