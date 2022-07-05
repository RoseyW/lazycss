const set = function (path: string, value: any){
    let paths = getPaths(path);
    //namespace.className.styleName && N.C.childName.styleName &&
    setDeepValue(window.Lazy._global, paths, value);
}

const get = function (path: string){
    let paths = getPaths(path);
    return getDeepValue(window.Lazy._global, paths);
}

const getPaths = function (path: string){
    let paths = path.split(".");
    if(paths.length <= 2){
        paths.unshift("_sheet");
        paths.unshift("_default");
    } else {
        let namespace = paths[0];
        paths.shift();
        paths.unshift("_sheet");
        paths.unshift(namespace);
    }
    console.log("deepPath", paths);
    return paths;
}

const setDeepValue = (object, path, value) => {
    let fieldPath = [...path];
    if (fieldPath.length) {
        const key = fieldPath.shift();
        if (object && object[key]){
            object[key] = setDeepValue(object[key], fieldPath, value);
        }
    } else {
        object = value;
    }
    return object;
};

const getDeepValue = (object, path) => {
    let value = "";
    let fieldPath = [...path];
    if (fieldPath.length) {
        const key = fieldPath.shift();
        if (object && object[key]){
            return getDeepValue(object[key], fieldPath);
        }
    } else {
        value = object;
    }

    return value;
};

export {
    set,
    get
}