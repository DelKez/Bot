const Discord = require('discord.js'); 
const client = new Discord.Client(); 

var prefix = "*"; 

var Inscription = [];
var ID = [];

var Pts = [];
var P = 0;
var B = 0;

var J = 0;
var Joueur = [];

var C = 0;

var W = 0;

var T = 0;

var M = 0;

var D = false;

client.login("process.env.TOKEN"); 
client.on("ready", () => { });

client.on('message', function (message) {                                                     // INSCRIPTION
    if (message.content === '!ins') {

        ID = message.member;

        if (Inscription.indexOf(ID) != -1) {

            message.reply ("tu es déjà inscrit !")            
        }

        else {

            Inscription = Inscription + [ID];
            Pts.push(ID,300,0,0);                                                             // ID,Pts Banque, Pts misé ?, Joueur misé ?
            
            message.reply ("tu es inscrit aux paris ! Points de départ : 300 !")
        }       
    }
})

client.on('message', function (message) {                                                     // PARIS
    if (message.content.startsWith("!bet ")) {

        J = message.content.substr(5, 1);
        P = message.content.substr(7, 10);

        if (J == " " || P == " ") {

            message.reply("commande invalide !")
        }

        else {

            J = parseInt(J);
            P = parseInt(P);

            ID = message.member;

            if (D == false) {

                message.reply('les paris sont déctivés !')
            }

            else if (Pts[Pts.indexOf(ID)+2] != 0) {

                message.reply("tu as déjà parié !")
            }

            else if (P > Pts[Pts.indexOf(ID)+1] && P != 0) {

                P = Pts[Pts.indexOf(ID)+1];
                message.reply ("tu n'as que " + P + "points ! Tu ne peux pas parier autant !")
            }

            else if (Pts[Pts.indexOf(ID)+1] == 0) {

                message.reply("tu n'as plus de points !")
            }

            else if (Inscription.indexOf(ID) != -1 && Joueur.indexOf(J) != -1) {

                Joueur[Joueur.indexOf(J)+1] = Joueur[Joueur.indexOf(J)+1] + P
                Pts[Pts.indexOf(ID)+1] = Pts[Pts.indexOf(ID)+1] - P;
                Pts[Pts.indexOf(ID)+2] = P;
                Pts[Pts.indexOf(ID)+3] = J;
                message.reply ("tu as parié " + P + " points sur le joueur " + J + " !")
                message.channel.send ("Mise total sur le joueur : " + Joueur[Joueur.indexOf(J)+1])
                B = B + P
            }

            else if (Inscription.indexOf(ID) == -1) {

                message.reply("tu n'es pas encore inscrit aux paris ! (!ins)")
            }

            else {

                message.reply ("le joueur " + J + " n'existe pas !")
            }
        }   
    }
})

client.on('message', function (message) {                                                     // COTES
    if (message.content === '!cotes') {

        J = 0;
        T = Joueur[Joueur.length - 3]
        message.channel.send("Côtes des joueurs :")

        while (J++ != T) {

            Joueur[Joueur.indexOf(J)+2] = 2 - (Joueur[Joueur.indexOf(J)+1] / B);
            Joueur[Joueur.indexOf(J)+2] = Joueur[Joueur.indexOf(J)+2].toFixed(2);
            message.channel.send ("J" + J + " : " + Joueur[Joueur.indexOf(J)+2])
        }   
    }
})

client.on('message', function (message) {                                                     // POINTS
    if (message.content === '!pts') {

        ID = message.member;
        P = Pts[Pts.indexOf(ID)+1];

        message.reply ("tu as " + P + " points.")
    }
})

client.on('message', function (message) {                                                     // Cmd Jesse
    ID = message.member;

    if (ID == 372062512558112780) {

        if (message.content.startsWith ("!j")) {

            J = message.content.substr(3, 10);

            if (J == " ") {

                message.reply("commande invalide !")
            }

            else {

                J = parseInt(J);
                T = 0;

                while (T++ != J) {

                    Joueur.push(T,0,0)                                              // Num  0, Mise  +1, Cote  +2
                }

                message.channel.send(J + " Joueur sont enregistré !")
                message.channel.send("Les paris sont activé !")
            }

            D = true;
        }

        if (message.content === '!sb') {
            
            message.channel.send("Les paris sont désactivé !")
            D = false

            message.channel.send("Côtes des joueurs :")
            J = 0;
            T = Joueur[Joueur.length - 3]

            while (J++ != T) {

                Joueur[Joueur.indexOf(J)+2] = 2 - (Joueur[Joueur.indexOf(J)+1] / B);
                Joueur[Joueur.indexOf(J)+2] = Joueur[Joueur.indexOf(J)+2].toFixed(2);
                message.channel.send ("J" + J + " : " + Joueur[Joueur.indexOf(J)+2])
            }    
        }

        if (message.content.startsWith ('!win ')) {

            J = message.content.substr(5,10);
            J = parseInt(J);

            message.channel.send("Le joueur " + J + " a gagné !")

            P = Pts.length -1;
            W = 0;

            while (W++ != P) {

                if (W == J) {

                    Pts[Pts.indexOf(W)-2] = Pts[Pts.indexOf(W)-2] + (Pts[Pts.indexOf(W)-1] * Joueur[Joueur.indexOf(J)+2]);
                    Pts[Pts.indexOf(W)-2] = Math.round(Pts[Pts.indexOf(W)-2]); 
                
                }
            } 

            Joueur = [];

            P = (Pts.length / 4)-1;
            T = -1;

            while (T++ < P) {

                Pts[(T*4)+2] = 0;
                Pts[(T*4)+3] = 0;
            }

            message.channel.send("Les paris sont désactivés !")
        }

        if (message.content === '!t') {

            T = -1;
            P = 4;

            while (T++ != P) {

                message.reply(T)
                //message.reply(Pts[Pts.indexOf(T)+3])
            }
        }    
    }
})

//HEROKU MDP : 4884J$