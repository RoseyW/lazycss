const createSheet = function (this: Window["Lazy"], { ...cssSheet }: Object){

    this._sheet = cssSheet;

    return this;
}

const namespace = function (this: Window["Lazy"], namespace){

    this._namespace = namespace;

    return this;
}

export {
    createSheet,
    namespace
}