const rgba = function (r, g, b, a){
    let hex = Number(r).toString(16) + Number(g).toString(16) + Number(b).toString(16);
    if(a !== void 0){
        hex += (Math.floor((a * 100 * 255) / 100)).toString(16);
    }

    return hex;
}

export default rgba;
