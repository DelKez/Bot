// APPEL FICHIERS
const Date = require("../tool/date")

module.exports.cmd = function (cmd){
    if (cmd[0] == "!help"){
        mot = help()
    }
    else if (cmd[0] == "!seance"){
        mot = start(cmd)
    }
    else {
        mot = "..."
    }
    return mot
}

function help(){    
    mot = "!seance Titre S Ep Ep Date Heure Nom —>" + "\n" + "||@everyone|| **SÉANCE :** " + "**" + "Titre" + "** - SAISON " + "S" + " ÉPISODE " + "Ep" + " À " + "Ep" + " PROGRAMMER AU " + "Date" + " - " + "Heure" + " — HÔTE : " + "Nom"
    return mot
}

function start(cmd){

    if (cmd[5] == "ajd"){
        cmd[5] = Date.date()
    }

    mot = "**SÉANCE :** " + "**" + cmd[1] + "** - SAISON " + cmd[2] + " ÉPISODE " + cmd[3] + " À " + cmd[4] + " PROGRAMMER AU " + cmd[5] + " - " + cmd[6] + " — HÔTE : "
    mot = "||@everyone|| " + mot.toUpperCase() + cmd[7]
    return mot
}