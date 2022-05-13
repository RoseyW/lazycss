import { List } from "./autoCompatibleList";

const autoCompatible = function(cssName: string){
    for (let i = 0; i < List.length; i++) {
        console.log(List[i]);
        if(List[i] === cssName){
            return true;
        }
    }
    return false;
}
export default autoCompatible;
