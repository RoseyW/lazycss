import { render } from "./render";


const use = function (type: any){

    if(type instanceof Function){
        type();
    }

    return {
        use,
        render
    }
}

export {
    use
}