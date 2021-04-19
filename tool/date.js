module.exports.date = function (){
    date = Date().split(" ");
    jour1 = date[2];
    annee = date[3][2]+date[3][3];

    mois = date[1];
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

    jour2 = date[0];
    if (jour2 == "Mon") {
        jour2 = "Lundi";
    }
    else if (jour2 == "Tue") {
        jour2 = "Mardi";
    }
    else if (jour2 == "Wed") {
        jour2 = "Mercredi";
    }
    else if (jour2 == "Thu") {
        jour2 = "Jedi";
    }
    else if (jour2 == "Fri") {
        jour2 = "Vendredi";
    }
    else if (jour2 == "Sat") {
        jour2 = "Samedi";
    }
    else if (jour2 == "Sun") {
        jour2 = "Dimanche";
    } 

    dat = [jour2,jour1+"/"+mois+"/"+annee]
    
    return dat;
}