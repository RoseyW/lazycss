const humpToLine = function(value: string) {
    return value.replace(/([A-Z])/g,"-$1").toLowerCase();
}

export {
    humpToLine
}