module.exports.date = function (){
    mois = Date()[4] + Date()[5] + Date()[6];
    if (mois == "Jan") {
        mois = "01";
    }
    if (mois == "Feb") {
        mois = "02";
    }
    if (mois == "Mar") {
        mois = "03";
    }
    if (mois == "Apr") {
        mois = "04";
    }
    if (mois == "May") {
        mois = "05";
    }
    if (mois == "Jun") {
        mois = "06";
    }
    if (mois == "Jul") {
        mois = "07";
    }
    if (mois == "Aug") {
        mois = "08";
    }
    if (mois == "Sep") {
        mois = "09";
    }
    if (mois == "Oct") {
        mois = "10";
    }
    if (mois == "Nov") {
        mois = "11";
    }
    if (mois == "Dec") {
        mois = "12";
    }

    dat = Date()[8] + Date()[9] +"/"+ mois +"/"+ Date()[13] + Date()[14];
    
    return dat;
}