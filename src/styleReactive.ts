//autoload reactive

const globalReactive = async function (){
    let timer;
    window.onresize = function (){
        let width = document.documentElement.clientWidth;
        let height = document.documentElement.clientHeight;
        if (timer) clearTimeout(timer);
        // 如果已经执行过，不再执行
        let callNow = !timer;
        timer = setTimeout(() => {
            timer = null;
        }, 100)
        if (callNow) {
            reactiveNotice(width, height);
        }
    }
}

const reactiveNotice = async function (clientWidth: number, clientHeight: number){
    let watchFuncList = window.cssLazy.__watch;
    for (let i = 0; i < watchFuncList.length; i++) {
        watchFuncList[i](clientWidth, clientHeight);
    }
}

const watchEffect = function (func: Function){
    let width = document.documentElement.clientWidth;
    let height = document.documentElement.clientHeight;
    func(width, height);
    window.cssLazy.__watch.push(func);
}

export {
    globalReactive,
    watchEffect
}
