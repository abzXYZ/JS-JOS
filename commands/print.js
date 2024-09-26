import * as global from "../global.js";

export function main(cmd){
    if(cmd.split(" ")[1]){
        global.updateConsole(cmd.substr(6), true);
    } else {
        global.updateConsole();
    }
}