const namespace = function (namespace: string){
    return function (){
        window.Lazy._namespace = namespace;
    }
}

export {
    namespace
}