

module.exports.cmd = function (cmd){
    if (cmd[0] == "help"){
        mot = help(cmd)
    }
    if (cmd[0] == "seance"){
        mot = start(cmd)
    }
    return mot
}

function help(cmd){
    mot = "!seance Titre S Ep Ep Date Heure Nom —>" + "\n" + "**SÉANCE :** " + "**" + "Titre" + "** - SAISON " + "S" + " ÉPISODE " + "Ep" + " À " + "Ep" + " PROGRAMMER AU " + "Date" + " - " + "Heure" + " — HÔTE : " + "Nom"
    return mot
}

function start(cmd){
    mot = "**SÉANCE :** " + "**" + cmd[1] + "** - SAISON " + cmd[2] + " ÉPISODE " + cmd[3] + " À " + cmd[4] + " PROGRAMMER AU " + cmd[5] + " - " + cmd[6] + " — HÔTE : " + cmd[7]
    return mot
}