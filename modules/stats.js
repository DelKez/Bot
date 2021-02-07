// APPEL FICHIERS
const Fortnite = require('./stats/fortnite');

module.exports.cmd = function(cmd,client){

    if (cmd[0] == "!help"){
        mot = help();
    }
    else if (cmd[0] == "!ft"){
        data = Fortnite.cmd([cmd[1],cmd[2]],client);
    }
    return mot || "..."
}

function help(){    
    mot = "Lol";
    return mot
}