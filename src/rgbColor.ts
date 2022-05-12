const rgb = function (r: number, g: number, b: number){
    if (g !== undefined){
        return "#" + Number(0x1000000 + r*0x10000 + g*0x100 + b).toString(16).substring(1);
    } else {
        return "#" + Number(0x1000000 + r[0] * 0x10000 + r[1] * 0x100 + r[2]).toString(16).substring(1);
    }
}

export default rgb;
