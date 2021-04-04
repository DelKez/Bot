module.exports.num = function (num){

    if (num < 0){return 0}
    else if (num <= 10) {return numero(num)}
    else if (num <= 99) {
        dizaine = numero(Math.floor(num/10));
        unite = numero(num%10);
        mot = dizaine + unite;
        return mot
    }
    else {return 0}
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

module.exports.cap = function (num){

    if (num < 0){return 0}

    else if (num == 0) {
        return "0️⃣"
    }
    else if (num == 1) {
        return "1️⃣"
    }
    else if (num == 2) {
        return "2️⃣"
    }
    else if (num == 3) {
        return "3️⃣"
    }
    else if (num == 4) {
        return "4️⃣"
    }
    else if (num == 5) {
        return "5️⃣"
    }
    else if (num == 6) {
        return "6️⃣"
    }
    else if (num == 7) {
        return "7️⃣"
    }
    else if (num == 8) {
        return "8️⃣"
    }
    else if (num == 9) {
        return "9️⃣"
    }
    else if (num == 10) {
        return "🔟"
    }
    else {return 0}
}