const render = function (this: Window["Lazy"]){


    let namespace = this._namespace ?? "_default";

    this._global = { [namespace]: this._sheet ?? {} }

    delete this._sheet;
    delete this._namespace;

    return this;
}

export {
    render
}