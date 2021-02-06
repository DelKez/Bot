module.exports.num = function (num){

    if (num < 0){return neg}
    else if (num <= 32) {return tour(num)}
    else {return outOfRange}
}

function tour(num) {
    if (num == 0) {
        return "de la FINALE"
    }
    if (num == 1) {
        return "de la Petite finale (3ème place)"
    }
    if (num == 2) {
        return "des Demis-finale"
    }
    if (num == 4) {
        return "des Quarts de finale"
    }
    if (num == 8) {
        return "des 1/8ème de finale"
    }
    if (num == 16) {
        return "des 1/16ème de finale"
    }
    if (num == 32) {
        return "des 1/32ème de finale"
    }
}