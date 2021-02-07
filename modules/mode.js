var ModeList = ["robot","cinéma","sondage","compétition","stats"];
var Mode = "robot";

module.exports.cmd = function (cmd){
    if (cmd[0] == "!mode"){
        mot = setMode(cmd[1])
    }
    else {
        mot = "..."
    }
    return mot
}

module.exports.getMode = function (){
    return Mode
}

function setMode (mode){

    if (ModeList.indexOf(mode) >= 0){
        mot = "Bien reçu, je passe en mode " + mode + " !";
        Mode = mode;
    } 
    else{
        mot = "Désolé, ce mode n'est pas enregistré dans ma mémoire !" + mode;       
    }
    return mot
}