const Discord = require('discord.js'); 
const client = new Discord.Client(); 
client.login(process.env.TOKEN); 
client.on("ready", () => { });

// TOUT
var A = 0;
var B = 0;
var T = 0;
var Image;

// MODES
var Mode; 
var ModeList = ["paris","questionnaire","sondage"];

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
var SondageList;

client.on('message', function (message) {  
    
    ID = message.member;

    if (ID == 372062512558112780) {

        if (message.content.startsWith("!mode")) {
        
            Mode = message.content.substr(6,100);
            
            if (ModeList.indexOf(Mode) != -1) {

                message.reply("Bien reçu, je passe en mode " + Mode + " !")
            } 
            
            else {

                message.reply("Désolé, ce mode n'est pas enregistré dans ma mémoire !")            
            }
        }

        if (message.content === '!test') {
            message.reply("Test !")
            message.delete();
        }
    }

    if (Mode == "paris") {

        if (ID == 372062512558112780) {

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

        if (ID == 372062512558112780) {

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

        if (message.content.startsWith("!start ")) {

            message.delete();

            SondageList = message.content.substr(7, 999);
            SondageList = SondageList.split(' ');

            message.channel.send("Liste de départ :")

            SondageTemp = 0;

            while (SondageTemp < SondageList.length) {

                message.channel.send(SondageList[SondageTemp])
                SondageTemp++;
            }
        }

        if (message.content.startsWith("!vs ")) {

            SondageList = message.content.substr(4, 999);
            SondageList = SondageList.split(' ');

            message.delete();

            SondageTemp = 0;

            while (SondageTemp < SondageList.length) {

                message.channel.send(SondageList[SondageTemp]+" :vs: "+SondageList[SondageTemp + 1])
                message.channel.send(SondageList[SondageTemp]+" :one:")
                message.channel.send(SondageList[SondageTemp + 1]+" :two:").then(sentEmbed => {
                    sentEmbed.react("1️⃣")
                    sentEmbed.react("2️⃣")
                })
                SondageTemp = SondageTemp + 2;
            }
        }
    }
})