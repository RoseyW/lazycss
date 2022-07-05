const watch = function (name, callback){

}

const obs = function (name, oldValue, newValue){
    console.log(name, oldValue, newValue);
}

export {
    watch,
    obs
}