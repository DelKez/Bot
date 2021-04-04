module.exports.tlt = function (num){

    if (num == 2) {
        return ["de la FINALE","de la Petite finale (3ème place)"]
    }
    else if (num == 4) {
        return "des Demis-finale"
    }
    else if (num == 8) {
        return "des Quarts de finale"
    }
    else if (num == 16) {
        return "des 1/8ème de finale"
    }
    else {
        return "de la phase de groupe"
    }
}

module.exports.num = function (num){

    if (num == 2) {
        return ["FINALE","Petite finale"]
    }
    else if (num == 4) {
        return "Demis-finale n°"
    }
    else if (num == 8) {
        return "Quarts de finale n°"
    }
    else if (num == 16) {
        return "1/8ème de finale n°"
    }
    else {
        return "Groupe n°"
    }
}