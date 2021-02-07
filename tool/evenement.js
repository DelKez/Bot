// APPEL FICHIERS
const Joueurs = require("../modules/stats/joueurs")
console.log('Joueurs:', Joueurs['fortnite'].length)
const Fortnite = require("../modules/stats/fortnite")

module.exports.cmd = function (type,client){

    if (type.indexOf("fortnite") != -1){
        fortnite(client);
    }

}

function fortnite(client) {

    i = 0;
    while (i<Joueurs["fortnite"].length) {
        Fortnite.cmd(Joueurs['fortnite'][i],client)
        i++;
    }
}