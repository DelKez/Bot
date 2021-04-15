// APPEL FICHIERS
const Fortnite = require("../modules/stats/fortnite")

module.exports.cmd = function (type,client," "){

    if (type == "fortnite"){
        Fortnite.cmd(["!ft","tlm"],client)
    }
}
