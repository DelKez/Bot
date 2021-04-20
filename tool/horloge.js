module.exports.horloge = function (){
    return horloge()
}

module.exports.date = function (){
    return horloge()[0]
}

module.exports.jour = function (){
    return horloge()[1]
}

module.exports.heure = function (){
    return horloge()[2]
}

function horloge() {

    DATE = Date().split(" ");

    jour = DATE[2];
    annee = DATE[3][2]+DATE[3][3];
    mois = DATE[1];
    if (mois == "Jan") {
        mois = "01";
    }
    else if (mois == "Feb") {
        mois = "02";
    }
    else if (mois == "Mar") {
        mois = "03";
    }
    else if (mois == "Apr") {
        mois = "04";
    }
    else if (mois == "May") {
        mois = "05";
    }
    else if (mois == "Jun") {
        mois = "06";
    }
    else if (mois == "Jul") {
        mois = "07";
    }
    else if (mois == "Aug") {
        mois = "08";
    }
    else if (mois == "Sep") {
        mois = "09";
    }
    else if (mois == "Oct") {
        mois = "10";
    }
    else if (mois == "Nov") {
        mois = "11";
    }
    else if (mois == "Dec") {
        mois = "12";
    }
    date = jour+"/"+mois+"/"+annee;

    jour = DATE[0];
    if (jour == "Mon") {
        jour = "Lundi";
    }
    else if (jour == "Tue") {
        jour = "Mardi";
    }
    else if (jour == "Wed") {
        jour = "Mercredi";
    }
    else if (jour == "Thu") {
        jour = "Jedi";
    }
    else if (jour == "Fri") {
        jour = "Vendredi";
    }
    else if (jour == "Sat") {
        jour = "Samedi";
    }
    else if (jour == "Sun") {
        jour = "Dimanche";
    } 

    heure = DATE[4]

    return [date,jour,heure]
}