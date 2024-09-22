import * as global from "./global.js";

function clearConsole(){
    Array.from(dosconsole.childNodes).forEach(element => {
        if(document.getElementById("midiinfo")){
            if(element !== document.getElementById("midiinfo") && element !== document.getElementById("midiinfo").nextSibling){
                element.remove();
            }  
        } else {
            element.remove();
        }  
    });
    userinput.value = "";
    updateConsole("");
}

function playmid(file){
    var audio = new Audio();
    var brbeforetext = dosconsole.children[dosconsole.children.length - 3];
    let duration = 0;
    brbeforetext.setAttribute('id','midiinfo');
    MIDIjs.get_duration(file, function(seconds) {duration = Math.round(seconds)} );
    MIDIjs.play(file, audio); 
    //midiinfo.status = true;
    MIDIjs.player_callback = function(e){
        let playtime = Math.round(e.time);
        let slider = "├──────────┤";
        let percent = Math.round((playtime/duration)*10) + 1;
        slider = slider.substring(0,percent) + "■" + slider.substring(percent);
        brbeforetext.nextSibling.textContent = playtime + " / " + duration + " " + slider;
        if(playtime == duration){
            brbeforetext.setAttribute('id','');
        }
    };
}

function bytesToBase64(bytes) {
    const binString = String.fromCodePoint(...bytes);
    return btoa(binString);
}

function openFilePrompt() {
    fileinput.click();
}

fileinput.addEventListener("change",function(){
    if(fileinput.files[0]){
        let reader = new FileReader();
        reader.readAsDataURL(fileinput.files[0]);
        reader.onloadend = function(){
            updateConsole("File opened: " + fileinput.files[0].name);
            global.vars.filelist.push({
                name: fileinput.files[0].name,
                type: fileinput.files[0].type,
                file: reader.result
            });
        }
    }
});


async function loadCommand(file, cmd, run = false){
    try {
        const module = await import(file);
        if (!module) {
            updateConsole("[ERROR] Couldn't run the command from file.");
        } else {
            global.vars.loadedcmds.push(
                {
                    command: cmd,
                    main: module.main
                }
            );
            if (run) module.main(); 
        }
    } catch (error) {
        console.log(error.message);
        updateConsole("[ERROR] Couldn't load the command from file.");
    }
}

function parseCommand(cmd, decission){
    console.log(global.vars.loadedcmds);
    const foundCmdInLoaded = global.vars.loadedcmds.find(x => x.command === cmd.split(" ")[0]);
    if(foundCmdInLoaded){
        console.log("Running pre-loaded command");
        foundCmdInLoaded.main();
    } else {
        const foundCmd = commands.find(x => x.command === cmd.split(" ")[0]);
        if(foundCmd){
            console.log("Loading the command");
            loadCommand("./commands/" + foundCmd.file, foundCmd.command, true);
        } else {
            global.updateConsole("Unknown command: " + cmd);
        }
    }
}

document.addEventListener('keydown', function (e) { //Key combo handler
    if(e.key === "ArrowUp"){
        if(userinput.value === ""){
            userinput.value = global.vars.lastcmd;
        }
    }
    if(e.key === "Enter"){
        if(!global.vars.awaitinput){
            global.vars.lastcmd = userinput.value;
            parseCommand(userinput.value);
        } else {
            parseCommand(global.vars.lastcmd, userinput.value);
        }
    }
}, false);