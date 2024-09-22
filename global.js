export const dosconsole = document.getElementById("console"); // console element
export const userinput = document.getElementById("userinput"); // user input field
export const fileinput = document.getElementById("fileinput"); // file input 
export const vars = {
    awaitinput: false,
    lastcmd: "", // last user command
    filelist: [], // uploaded files
    loadedcmds: [] // imported commands
};

export function updateConsole(text, newline = true) {
    let lastinput = document.createTextNode(userinput.value);
    let start = document.createTextNode("C:\\JSJOS\\SYSTEM32> ");
    dosconsole.append(lastinput, document.createElement("br"));
    if(text){
        dosconsole.append(document.createTextNode(text), document.createElement("br"));
    }
    if(newline || !text){
        dosconsole.append(start);
    }
    dosconsole.append(userinput);
    userinput.value = "";
    userinput.focus();
}

export function checkFileType(file, type = false){
    if(type){
        if(file.type.slice(0,type.length) == type){
            return true;
        }
        return false;
    } else {
        return true;
    }
}

export function parseFileQuery(arg, type = false){
    if(arg.length == 1 && !isNaN(arg)){
        if(arg >= 0 && arg < vars.filelist.length){
            if(checkFileType(vars.filelist[arg], type)){
                return vars.filelist[arg];
            }
        }
    } else if(vars.filelist.some((Object) => Object.name === arg)) {
        let foundfile = vars.filelist.find((Object) => Object.name === arg);
        if(checkFileType(foundfile,type)){
            return foundfile;
        }
    }
    return false;
}