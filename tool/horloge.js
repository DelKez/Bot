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

    jour = DATE.getUTCDate() ;
    mois = DATE.getUTCMonth()+1;
    if (mois < 10){mois = "0"+mois}
    annee = DATE.getUTCFullYear();

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
        jour = "Jedi";
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

    heure = DATE.getUTCHours()+2 +":"+ DATE.getUTCMinutes() +":"+ DATE.getUTCSeconds()

    return [date,jour,heure]
}