import cssList from "./cssList";
import render from "./sytleRender";
import {cssMethods} from "./cssList";
import {styleMedia} from "./styleMedia";

const init = function (){
    let styles = document.createElement("styles");
    let selfStyle = document.createElement("style");
    selfStyle.innerHTML = "styles{display:none}";
    styles.appendChild(selfStyle);
    document.body.appendChild(styles);
}

const useStyle = function ({...args}: cssList, selfMethod?: cssMethods){
    //初始化
    init();
    let mapArgs = Object.entries(args);
    let styleObjProxy:any = {};
    for (let i =0; i < mapArgs.length; i++) {
        render(mapArgs[i][0], mapArgs[i][1]);
        let proxyArgs = {...mapArgs[i][1]};
        proxyArgs['fatherNode'] = mapArgs[i][0];
        styleObjProxy[mapArgs[i][0]] = new Proxy(proxyArgs, {
            set: function (target, property, value, receiver) {
                if(property === "fatherNode"){
                    console.error("can't set father node");
                    return;
                }
                target[property] = value;
                render(target['fatherNode'],target, selfMethod);
                return Reflect.get(target, property, receiver);
            }
        });
    }

    //防止响应式篡改
    return new Proxy(styleObjProxy, {
        set: function (target, property, value, receiver) {
            return Reflect.get(target, property, receiver);
        }
    });
}

useStyle.prototype.setMedia = function (media: styleMedia){
    return "abc";
}

useStyle.prototype.addChild = function (child: any){
    return "addChild";
}

export default useStyle;
