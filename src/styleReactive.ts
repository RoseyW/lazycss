//autoload reactive

const globalReactive = function (){
    let timer;
    window.onresize = function (){
        let width = document.body.clientWidth;
        let height = document.body.clientHeight;

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

const reactiveNotice = function (clientWidth: number, clientHeight: number){
    console.log(clientHeight, clientWidth);
    autoFontSize(clientWidth, clientHeight);
}

const autoFontSize = function (w,h){
    let al = (w / h) / 3.28;
}

export {
    globalReactive
}
