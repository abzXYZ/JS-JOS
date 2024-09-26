import * as global from "../global.js";

export function main(cmd){
    if(cmd.split(" ")[1] == "base64"){
        global.updateConsole(atob(cmd.substr(14)), true);
    } else {
        global.updateConsole("decoding error", true);
    }
}