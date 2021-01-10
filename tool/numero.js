module.exports.num = function (num){

    if (num < 0){return neg}
    else if (num <= 10) {return numero(num)}
    else if (num <= 99) {
        dizaine = numero(Math.floor(num/10));
        unite = numero(num%10);
        mot = dizaine + unite;
        return mot
    }
    else {return outOfRange}
}

function numero(num) {
    if (num == 0) {
        return ":zero:"
    }
    if (num == 1) {
        return ":one:"
    }
    if (num == 2) {
        return ":two:"
    }
    if (num == 3) {
        return ":three:"
    }
    if (num == 4) {
        return ":four:"
    }
    if (num == 5) {
        return ":five:"
    }
    if (num == 6) {
        return ":six:"
    }
    if (num == 7) {
        return ":seven:"
    }
    if (num == 8) {
        return ":eight:"
    }
    if (num == 9) {
        return ":nine:"
    }
    if (num == 10) {
        return ":keycap_ten:"
    }
}