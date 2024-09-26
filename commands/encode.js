import * as global from "../global.js";

function bytesToBase64(bytes) {
    const binString = String.fromCodePoint(...bytes);
    return btoa(binString);
}

export function main(cmd){
    if(cmd.split(" ")[1] == "base64"){
        global.updateConsole(bytesToBase64(new TextEncoder().encode(cmd.substr(14))), true);
    } else {
        global.updateConsole("encoding error", true);
    }
}