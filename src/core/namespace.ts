import { render } from "./render";

const namespace = function (namespace){

    console.log(window.cssLazy);

    return {
        render
    };
}

export {
    namespace
}