//autoload reactive
import {Observe} from "./styleObserve";
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
            Observe("__global", "client", "resize", width, height);
        }
    }
}
export {
    globalReactive
}
