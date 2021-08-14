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

    DATE = new Date();

    jour = DATE.getUTCDate();
    mois = DATE.getUTCMonth()+1;
    annee = DATE.getUTCFullYear()-2000;
    if (mois < 10){mois = "0"+mois}
    if (jour < 10){jour = "0"+jour}

    date = jour+"/"+mois+"/"+annee;

    jour = DATE.getUTCDay()
    if (jour == 1) {
        jour = "Lundi";
    }
    else if (jour == 2) {
        jour = "Mardi";
    }
    else if (jour == 3) {
        jour = "Mercredi";
    }
    else if (jour == 4) {
        jour = "Jeudi";
    }
    else if (jour == 5) {
        jour = "Vendredi";
    }
    else if (jour == 6) {
        jour = "Samedi";
    }
    else if (jour == 0) {
        jour = "Dimanche";
    } 
    
    heure = DATE.getUTCHours()+2
    minute = DATE.getUTCMinutes()
    seconde = DATE.getUTCSeconds()
    if (heure < 10){heure = "0"+heure}
    if (minute < 10){minute = "0"+minute}
    if (seconde < 10){seconde = "0"+seconde}

    heure = heure+":"+minute+":"+seconde

    return [date,jour,heure]
}
