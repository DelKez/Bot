// APPEL FICHIERS
const Date = require("../tool/date")
const Tour = require("../tool/tour")

module.exports.cmd = function (cmd){
    if (cmd[0] == "!help"){
        mot = help()
    }
    else if (cmd[0] == "!liste"){
        mot = start(cmd)
    }
    else {
        mot = "..."
    }
    return mot
}

function help(){    
    mot = "Lol"
    return mot
}

function start(cmd){

    console.log(cmd)

    L = cmd[2];
    L = L.split("'");

    mot = "Voici les sélectionnés " + Tour.num(cmd[1]) + " :"

    i = 0;
    while (i < L.length) {
        mot = mot + "\n" + L[i];
        i++;
    }

    return mot
}