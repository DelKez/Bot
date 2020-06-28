const Discord = require('discord.js'); 
const client = new Discord.Client(); 
client.login(process.env.TOKEN); 
client.on("ready", () => { });

// TOUT
var ID;
var OP = [372062512558113,419925262881260,457240529176887];
var A = 0;
var B = 0;
var T = 0;

// MODES
var Mode = "robot"; 
var ModeList = ["robot","paris","questionnaire","sondage"];

// MODE PARIS
var ParisJoueur;
var ParisPoints;
var ParisPointsTotal;
var ParisParieursList = [];
var ParisJoueursList = [];
var ParisDrapeau = false;

// MODE QUESTIONNAIRE
var QuestionnaireTemp;
var QuestionnaireRéponse;
var QuestionnaireQuestion = 1;
var QuestionnaireQuestionsList = [];
var QuestionnaireJoueursList = [];
var QuestionnaireRéponsesList = [];
var QuestionnaireDrapeau = true;

// MODE SONDAGE
var SondageTemp;
var SondageTemp2;
var SondageRand;
var SondageTour;
var SondageTourNum;
var SondageList;

// MODE JEUX
var JeuxMode;
var JeuxModeList = [];

function getRandomInt(max) {

    return Math.floor(Math.random() * Math.floor(max));
}

client.on('message', function (message) {  
    
    ID = message.member;

    if (message.content.startsWith("!id")) {

        message.author.send("ID : " + Math.round(ID / 1000));
    }

    if (OP.indexOf(Math.round(ID / 1000)) != -1) {

        if (message.content.startsWith("!mode ")) {
        
            Mode = message.content.substr(6,100);

            message.delete();
            
            if (ModeList.indexOf(Mode) != -1) {

                message.reply("bien reçu, je passe en mode " + Mode + " !")
            } 
            
            else {

                message.reply("désolé, ce mode n'est pas enregistré dans ma mémoire !")            
            }
        }

        if (message.content === '!mode?') {

            message.reply("je suis en mode " + Mode               + "\n"
            + "Sinon voici la liste des modes dont je dispose :"  + "\n"
            + ModeList)  

            message.delete();
        }

        if (message.content === '!op') {

            message.author.send("Listes des OP : " + OP) 
            message.delete();
        }

        if (message.content.startsWith("!op ")) {
        
            ID = message.content.substr(4,100);
            OP.push(ID);
            message.author.send("Listes des OP : " + OP)
            message.delete();
        }

        if (message.content === '!test') {

            message.reply(getRandomInt(3))
            message.delete();
        }
    }

    if (Mode == "robot") {

        if (message.content === '!help') {

            message.reply("Vraiment ? Il faut que je rappelle les commandes ? Tu fais que d'oublier... Hein quoi ?" + "\n" + "\n"
            
            + "Liste des commandes du mode robot :"                                                                  + "\n" + "\n"
            
            + "!mode Sélectionne le mode de ton choix parmis tous ceux là :"                                         + "\n"
            + ModeList                                                                                               + "\n" + "\n"

            + "!mode? Te rappelle le mode qu'on m'a donné."                                                          + "\n" + "\n"

            + "Voilà voilà, et n'oublie plus ces commandes !"

            )
        }
    }

    if (Mode == "paris") {

        if (OP.indexOf(Math.round(ID / 1000)) != -1) {

            if (message.content.startsWith ("!j")) {

                ParisJoueur = message.content.substr(3, 10);
    
                if (ParisJoueur == " ") {
    
                    message.reply("commande invalide !")
                }
    
                else {
    
                    ParisJoueur = parseInt(ParisJoueur);
                    ParisParieursTotal = 0;
                    ParisJoueursList = [];
                    T = 0;
    
                    while (T++ != ParisJoueur) {
    
                        ParisJoueursList.push(T,0,0)                                              // Num(0),MiseTotal(1),Cote(2)
                    }

                    T = 0;
                    
                    ParisDrapeau = true;
                    message.channel.send(ParisJoueur + " Joueurs sont enregistré, les inscriptions sont désactivées et les paris s'activent !")  
                }
            }
        }

        if (message.content === '!ins') {

            if (ParisDrapeau == true) {

                message.channel.send("Les inscriptions ne sont pas activées !")
            }

            else if (ParisParieursList.indexOf(ID) == -1) {

                ParisParieursList.push(ID,300,0,0)                                                             // ID(0),Pts Banque (1),Joueur misé(2),Pts misé(3)     

                message.reply ("tu es inscrit aux paris ! Points de départ : 300 !")            
            }
    
            else {
    
                ParisParieursList[ParisParieursList.indexOf(ID)+1] = 300;
                message.reply("t'es points ont été réinitialisée à 300.")      
            }
        }

        if (message.content.startsWith("!bet ")) {

            ParisJoueur = message.content.substr(5, 1);
            ParisPoints = message.content.substr(7, 10);

            ParisJoueur = parseInt(ParisJoueur);
            ParisPoints = parseInt(ParisPoints);

            if (ParisDrapeau == false) {

                message.channel.send("Les paris ne sont pas activés !")
            }

            else if (ParisJoueursList == []) {

                message.channel.send("Les paris ne sont pas actifs !")
            }

            else if (ParisParieursList.indexOf(ID) == -1) {

                message.reply("tu n'es pas encore inscrit aux paris ! (!ins)")
            }

            else if (ParisJoueursList.indexOf(ParisJoueur) == -1) {

                message.reply ("le joueur " + ParisJoueur + " n'existe pas !")
            }

            else if (ParisPoints > ParisParieursList[ParisParieursList.indexOf(ID)+1]) {

                message.reply ("tu n'as que " + ParisParieursList[ParisParieursList.indexOf(ID)+1] + " points, Tu ne peux pas parier autant !")
            }

            else if (ParisPoints < 10) {

                message.reply ("les mises de moins de 10 points ne sont pas autorisées !")
            }

            else if (ParisParieursList[ParisParieursList.indexOf(ID)+1] == 0) {

                message.reply("tu n'as plus de points !")
            }

            else {

                ParisParieursList[ParisParieursList.indexOf(ID)+2] = ParisJoueur;
                ParisParieursList[ParisParieursList.indexOf(ID)+3] = ParisPoints;
                ParisParieursList[ParisParieursList.indexOf(ID)+1] = ParisParieursList[ParisParieursList.indexOf(ID)+1] - ParisPoints;
                ParisJoueursList[ParisJoueursList.indexOf(ParisJoueur)+1] = ParisJoueursList[ParisJoueursList.indexOf(ParisJoueur)+1] + ParisPoints;
                ParisPointsTotal = ParisPointsTotal + ParisPoints;
                message.reply ("tu as parié " + ParisPoints + " points sur le joueur " + ParisJoueur + " !")
            }
        } 

        if (message.content === '!pts') {
    
            message.reply ("tu as " + ParisParieursList[ParisParieursList.indexOf(ID)+1] + " points.")
        }

        if (message.content === '!cote') {

            message.channel.send("Côtes des joueurs :")
            T = 0;

            while (T++ < ParisJoueursList[ParisJoueursList.length - 3]) {

                ParisJoueursList[ParisJoueursList.indexOf(T)+2] = 2 - (ParisJoueursList[ParisJoueursList.indexOf(T)+1] / ParisPointsTotal);
                ParisJoueursList[ParisJoueursList.indexOf(T)+2] = ParisJoueursList[ParisJoueursList.indexOf(T)+2].toFixed(2);
                message.channel.send ("J" + T + " : " + ParisJoueursList[ParisJoueursList.indexOf(T)+2] + " Mise total sur le joueur : " + ParisJoueursList[ParisJoueursList.indexOf(T)+1])
            }
        }

        if (message.content === '!sb') {
            
            message.channel.send("Les paris sont désactivé !")
            D = false

            message.channel.send("Côtes des joueurs :")
            T = 0;

            while (T++ <= ParisJoueursList.length / 3) {

                ParisJoueursList[ParisJoueursList.indexOf(T)+2] = 2 - (ParisJoueursList[ParisJoueursList.indexOf(T)+1] / ParisPointsTotal);
                ParisJoueursList[ParisJoueursList.indexOf(T)+2] = ParisJoueursList[ParisJoueursList.indexOf(T)+2].toFixed(2);
                message.channel.send ("J" + T + " : " + ParisJoueursList[ParisJoueursList.indexOf(T)+2] + " Mise total sur le joueur : " + ParisJoueursList[ParisJoueursList.indexOf(T)+1])
            }    
        }
    }

    if (Mode == "questionnaire") {

        if (OP.indexOf(Math.round(ID / 1000)) != -1) {

            if (message.content === '!créateur') {

                message.channel.send("@everyone, l'heure est venu de rendre fier notre Créateur ! (!ins pour s'inscrire)")

                QuestionnaireQuestionsList = ["Si vous deviez décrire votre créateur en cinq adjectifs, lesquels choisirez-vous ?",
                "Quelle est le principale défaut du Créateur ?",
                "Selon vous, qu'est-ce que le créateur pense de vous ?",
                ""];

                QuestionnaireDrapeau = false;
            }

            if (message.content === '!start') {

                message.channel.send("C'est parti !")
                QuestionnaireDrapeau = false;

                while (QuestionnaireQuestion != QuestionnaireQuestionsList.length) {

                    message.channel.send("Question "+QuestionnaireQuestion+" :")
                    message.channel.send(QuestionnaireQuestionsList[QuestionnaireQuestion - 1])
                    QuestionnaireQuestion++;
                }

                QuestionnaireQuestion = 1;
            } 
            
            if (message.content === '!stop') {

                message.channel.send("C'est fini !")

                while (QuestionnaireQuestion != QuestionnaireQuestionsList.length) {

                    message.channel.send("Question "+QuestionnaireQuestion+" :")
                    message.channel.send(QuestionnaireQuestionsList[QuestionnaireQuestion - 1])
                    QuestionnaireQuestion++;
                }
            }
        }

        if (message.content === '!ins') {

            if (QuestionnaireDrapeau == true) {

                message.channel.send("Les inscriptions ne sont pas activées !")
            }

            else if (QuestionnaireJoueursList.indexOf(ID) == -1) {

                QuestionnaireJoueursList.push(ID,0)                                                                                       // ID(0),J(1)  
                QuestionnaireRéponsesList.push("","","","","","","","","","")                                                             // ID(0),Rep(1-10)  

                message.reply ("tu es inscrit aux Questionnaire, bonne chance !")            
            }

            message.delete();
        }

        if (message.content.startsWith("!q ")) {

            ID = message.member;

            QuestionnaireTemp = message.content.substr(3, 1);
            QuestionnaireTemp = parseInt(QuestionnaireTemp) + 1;

            QuestionnaireRéponse = message.content.substr(5,1000);

            QuestionnaireRéponsesList[QuestionnaireRéponsesList.indexOf(QuestionnaireTemp)] = QuestionnaireRéponse;
        }
    }

    if (Mode == "sondage") {

        if (OP.indexOf(Math.round(ID / 1000)) != -1) {

            if (message.content === '!help') {

                message.reply("bah alors, on a des troues de mémoire ?"                + "\n" + "\n"

                + "Liste des commandes du mode sondage :"                              + "\n" + "\n"
                
                + "!liste Affiche la liste de départ."                                 + "\n"
                + "Ex : !liste Cornflex, Chocapic, Miel Pops, Trésor"                  + "\n" + "\n"

                + "!tirage xx Affiche le tirage d'un tour xx."                         + "\n"
                + "Le nombre xx peut prendre ces valeurs : 16, 08, 04 et 02."          + "\n"
                + "16 = 1/16ème de finale, de même, 08 = 1/8ème de final ect..."       + "\n"
                + "Ex : !tirage 08 Cornflex, Chocapic, Miel Pops, Trésor"              + "\n" + "\n"

                + "!vs xx Lance un ou plusieurs duels selon le nombre xx."             + "\n"
                + "Le nombre xx peut prendre ces valeurs : 16, 08, 04, 02, 01 et 00."  + "\n"
                + "16 = 1/16ème de finale, de même, 08 = 1/8ème de final ect..."       + "\n"
                + "P'tite précision : 01 = Petite finale et 00 = Finale."              + "\n"
                + "Ex : !vs 02 Cornflex, Chocapic, Miel Pops, Trésor"                  + "\n" + "\n"

                + "!pro xx yy Lance la prolongation d'un duel du tour xx et de N° yy." + "\n"
                + "Le nombre xx peut prendre ces valeurs : 16, 08, 04, 02, 01 et 00."  + "\n"
                + "16 = 1/16ème de finale, de même, 08 = 1/8ème de final ect..."       + "\n"
                + "P'tite précision : 01 = Petite finale et 00 = Finale."              + "\n"
                + "Le nombre yy peut prendre ces valeurs : 16, 15, 14, ..., 02 et 01." + "\n"
                + "14 = Duel N°14, de même, 04 = Duel N°4 ect..."                      + "\n"
                + "Ex : !pro 04 02 Cornflex, Chocapic"                                 + "\n" + "\n"
                
                + "!fin Affiche le podium du tournoi."                                 + "\n"
                + "Ex : !fin Cornflex, Chocapic, Miel Pops"                            + "\n"
                + "Evidemment, dans l'exemple, Cornflex est N°1 et Miel Pops N°3"      + "\n" + "\n"

                + "!archive xx Affiche des archives selon xx."                         + "\n"
                + "Le nombre xx peut prendre ces valeurs : 16, 08, 04, 02, 01 et 00."  + "\n"
                + "16 = 1/16ème de finale, de même, 08 = 1/8ème de final ect..."       + "\n"
                + "P'tite précision : 01 = Annonce et 00 = Podium."                    + "\n"
                + "Ex : !archive 01, céréales, 07/05/2020, 14/05/2020"                 + "\n" 
                + "Ex : !archive 16, Cornflex, Chocapic"                               + "\n"
                + "Ex : !archive 00, Cornflex, Chocapic, Miel Pops"                    + "\n" + "\n"

                + "Et en p'tit rappelle, les virgules dans les commandes sont importante !"
                )
            }

            if (message.content.startsWith("!liste ")) {

                SondageList = message.content.substr(7, 999);
                SondageList = SondageList.split(', ');

                message.delete();

                message.channel.send("Liste de départ :")

                SondageTemp = 0;

                while (SondageTemp < SondageList.length) {

                    message.channel.send(SondageList[SondageTemp])
                    SondageTemp++;
                }

                SondageTemp = 0;

                while (SondageTemp < SondageList.length) {

                    SondageList[SondageTemp] = (" " + SondageList[SondageTemp])
                    SondageTemp++;
                }

                message.author.send("Commande pour lancer le premier tirage :")
                message.author.send("!tirage " + (SondageList.length / 2) + SondageList)

                message.channel.send(":loudspeaker:  BONNE CHANCE !")

            }

            if (message.content.startsWith("!tirage ")) {

                SondageTour = message.content.substr(8, 2);
                SondageList = message.content.substr(11, 999);
                SondageList = SondageList.split(', ');

                message.delete();

                SondageTemp = 0;
                SondageTemp2 = 0;
                SondageRandList = [];

                while (SondageTemp < SondageList.length) {

                    SondageRand = getRandomInt(SondageList.length);

                    SondageTemp2 = SondageList[SondageRand];
                    SondageList.splice(SondageRand, 1);
                    SondageList.push(SondageTemp2);

                    SondageTemp++;         
                }

                SondageTemp2 = SondageTour;

                if (SondageTour == "16") {
                    SondageTour = "Voici le tirage des seizièmes de finale :";
                }
                if (SondageTour == "08") {
                    SondageTour = "Voici le tirage des huitièmes de finale :";
                }
                if (SondageTour == "04") {
                    SondageTour = "Voici le tirage des quarts de finale :";
                }
                if (SondageTour == "02") {
                    SondageTour = "Voici le tirage des demi-finales :";
                }

                message.channel.send(SondageTour)

                SondageTemp = 0;

                while (SondageTemp < SondageList.length) {

                    message.channel.send(SondageList[SondageTemp] + " :vs: " + SondageList[SondageTemp + 1])
                    SondageTemp = SondageTemp + 2;
                }

                SondageTemp = 0;

                while (SondageTemp < SondageList.length) {

                    SondageList[SondageTemp] = (" " + SondageList[SondageTemp])
                    SondageTemp++;
                }

                message.author.send("Commande pour lancer les votes :")
                message.author.send("!vs " + SondageTemp2 + SondageList)

                message.channel.send(":loudspeaker:  FIN DU TIRAGE !")
            }

            if (message.content.startsWith("!vs ")) {

                SondageTour = message.content.substr(4, 2);
                SondageList = message.content.substr(7, 999);
                SondageList = SondageList.split(', ');

                SondageTourNum = 1;
                SondageTemp2 = " :"

                if (SondageTour == "16") {
                    SondageTour = "@everyone 1/16ème de finale N°";
                }
                if (SondageTour == "08") {
                    SondageTour = "@everyone 1/8ème de finale N°";
                }
                if (SondageTour == "04") {
                    SondageTour = "@everyone Quart de finale N°";
                }
                if (SondageTour == "02") {
                    SondageTour = "@everyone Demi-finale N°";
                }
                if (SondageTour == "01") {
                    SondageTour = "@everyone Petite finale (3ème place) :";
                    SondageTourNum = "";
                    SondageTemp2 = "";
                }
                if (SondageTour == "00") {
                    SondageTour = "@everyone FINALE :";
                    SondageTourNum = "";
                    SondageTemp2 = "";
                }

                message.delete();

                SondageTemp = 0;
                
                while (SondageTemp < SondageList.length) {
  
                    message.channel.send(SondageTour + SondageTourNum + SondageTemp2     + " \n"
                    + SondageList[SondageTemp] + " :vs: " + SondageList[SondageTemp + 1] + " \n"
                    + SondageList[SondageTemp] + " :one:"                                + " \n"
                    + SondageList[SondageTemp + 1] + " :two:").then(sentEmbed => {
                        sentEmbed.react("1️⃣")
                        sentEmbed.react("2️⃣")
                    })
                    
                    SondageTemp = SondageTemp + 2;
                    SondageTourNum++;
                }
            }

            if (message.content.startsWith("!pro ")) {

                SondageTour = message.content.substr(5, 2);
                SondageTourNum = message.content.substr(8, 2);
                SondageList = message.content.substr(11, 999);
                SondageList = SondageList.split(', ');

                if (SondageTourNum == "09") {
                    SondageTourNum = "9";
                }
                if (SondageTourNum == "08") {
                    SondageTourNum = "8";
                }
                if (SondageTourNum == "07") {
                    SondageTourNum = "7";
                }
                if (SondageTourNum == "06") {
                    SondageTourNum = "6";
                }
                if (SondageTourNum == "05") {
                    SondageTourNum = "5";
                }
                if (SondageTourNum == "04") {
                    SondageTourNum = "4";
                }
                if (SondageTourNum == "03") {
                    SondageTourNum = "3";
                }
                if (SondageTourNum == "02") {
                    SondageTourNum = "2";
                }
                if (SondageTourNum == "01") {
                    SondageTourNum = "1";
                }

                if (SondageTour == "16") {
                    SondageTour = "@everyone 1/16ème de finale N°";
                }
                if (SondageTour == "08") {
                    SondageTour = "@everyone 1/8ème de finale N°";
                }
                if (SondageTour == "04") {
                    SondageTour = "@everyone Quart de finale N°";
                }
                if (SondageTour == "02") {
                    SondageTour = "@everyone Demi-finale N°";
                }
                if (SondageTour == "01") {
                    SondageTour = "@everyone Petite finale (3ème place)";
                    SondageTourNum = "";
                }
                if (SondageTour == "00") {
                    SondageTour = "@everyone FINALE";
                    SondageTourNum = "";
                }

                message.delete();
                
                message.channel.send(SondageTour + SondageTourNum + " (prolongation) :"              + " \n"
                + SondageList[0] + " :vs: " + SondageList[1]                                         + " \n"
                + SondageList[0] + " :one:"                                                          + " \n"
                + SondageList[1] + " :two:").then(sentEmbed => {
                    sentEmbed.react("1️⃣")
                    sentEmbed.react("2️⃣")
                })
                    
                SondageTemp = SondageTemp + 2;
                SondageTourNum++;
                
            }

            if (message.content.startsWith("!fin ")) {

                SondageList = message.content.substr(5, 999);
                SondageList = SondageList.split(', ');

                message.delete();

                message.channel.send("@everyone C’est donc une victoire de " + SondageList[0] + " ! :first_place:" + "\n"
                + "Voici donc le podium de ce tournoi :"                                                           + "\n"
                + ":three::third_place: " + SondageList[2]                                                         + "\n"
                + ":two::second_place: "  + SondageList[1]                                                         + "\n"
                + ":one::first_place: "   + SondageList[0]
                )

            }

            if (message.content.startsWith("!archive ")) {

                SondageTour = message.content.substr(9, 2);
                SondageList = message.content.substr(12, 999);
                SondageList = SondageList.split(', ')

                message.delete();

                SondageTourNum = 1;
                SondageTemp2 = " :"

                if (SondageTour == "16") {
                    SondageTour = "1/16ème de finale";
                }
                if (SondageTour == "08") {
                    SondageTour = "1/8ème de finale";
                }
                if (SondageTour == "04") {
                    SondageTour = "Quart de finale";
                }
                if (SondageTour == "02") {
                    SondageTour = "Demi-finale";
                }

                SondageTemp = 0;

                if (SondageTour == "00") {
                    
                    message.channel.send("Voici le podium de ce tournoi :"                                             + "\n"
                    + ":three::third_place: " + SondageList[2]                                                         + "\n"
                    + ":two::second_place: "  + SondageList[1]                                                         + "\n"
                    + ":one::first_place: "   + SondageList[0]
                    )
                }

                else if (SondageTour == "01") {
                    
                    message.channel.send("**_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _**"  + "\n"
                    + "Le tournoi des **" + SondageList[0] + "** à débuté le **" + SondageList[1] + "** et s'est terminé le **" + SondageList[2] + "**")
                }

                else {

                    message.channel.send("**_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _**"  + "\n"
                    + SondageTour + " :")
                    
                    while (SondageTemp < SondageList.length) {
                        
                        message.channel.send("**_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _**"  + "\n"
                        + "**" + SondageList[SondageTemp] + "**" + " :vs: " + SondageList[SondageTemp + 1] )
        
                        SondageTemp = SondageTemp + 2;
                        SondageTourNum++;
                    }
                }
            }
        }
    }

    if (Mode == "jeux") {

        if (OP.indexOf(Math.round(ID / 1000)) != -1) {

            if (message.content === '!help') {

                message.reply("Vraiment ? Il faut que je rappelle les commandes ? Tu fais que d'oublier... Hein quoi ?" + "\n" + "\n"
            
                + "Liste des commandes du mode robot :"                                                                  + "\n" + "\n"
            
                + "!mode Sélectionne le mode de ton choix parmis tous ceux là :"                                         + "\n"
                + ModeList                                                                                               + "\n" + "\n"

                + "!mode? Te rappelle le mode qu'on m'a donné."                                                          + "\n" + "\n"

                + "Voilà voilà, et n'oublie plus ces commandes !"

                )
            }
        }

        if (message.content === '!liste') {
            message.reply("Voici la liste des jeux disponible :" +"\n"
            + JeuxModeList
            )
        }
    }
})
//HEROKU MDP : 4884J$