const getSetting = function (settingName: string){

    return window.Lazy._setting[settingName] ?? "";

}

export {
    getSetting
}