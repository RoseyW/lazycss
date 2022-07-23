const Units = {
    width: "px",
    height: "px",
    margin: "px"
}

const getUnits = function (name: string, value: any, namespace: string = "_default"){
    let userUnit;
    let globalUnit = window.Lazy._global._default._unit;
    userUnit = { ...globalUnit };
    if(namespace !== "_default"){
        let namespaceUnit = window.Lazy._global[namespace]._unit;
        userUnit = { ...globalUnit,...namespaceUnit };
    }

    let methodKey = Object.keys(userUnit);
    let includes = methodKey.includes(name);
    if(includes){
        return userUnit[name];
    }
    return false;
}

const getSystemUnits = function (name: string){
    return Units[name] ?? false;
}

export {
    getSystemUnits,
    getUnits
}
