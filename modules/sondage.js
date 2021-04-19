// APPEL FICHIERS
const Discord = require('discord.js'); 
const Date = require("../tool/date");
const Tour = require("../tool/tour");
const Couleur = require("../tool/couleur");
const Numero = require("../tool/numero");
const Cmd = require("../tool/cmd");
const Aleatoire = require("../tool/aleatoire");

module.exports.cmd = function (cmd,message){

    msg = ""
    if (cmd[0] == "!help"){
        help(message)
    }
    else if (cmd[0] == "!liste"){
        l = liste(cmd[1],message)
        msg = "!tirage"+" "+l
    }
    else if (cmd[0] == "!tirage"){
        l = tirage(cmd[1],message)
        msg = "!start"+" "+l
    }
    else if (cmd[0] == "!start"){
        start(cmd[1],message) 
    }
    else if (cmd[0] == "!prolong"){
        prolong(cmd,message)
    }
    else if (cmd[0] == "!podium"){
        podium(cmd,message)
    }
    if (msg != ""){
        emb = new Discord.MessageEmbed()
        .setColor('#44e3e8')
        .setTitle("Prochaine commande :")
        .setDescription("`"+msg+"`")
        message.channel.send(emb)
    }
}

function help(message){    

    emb = new Discord.MessageEmbed()
        .setColor('#44e3e8')
        .setAuthor("Cmd Sondage :","https://icon-library.com/images/white-gear-icon-png/white-gear-icon-png-12.jpg")
        .addFields(
            { name: '!liste (Liste)',            value: "Liste : Chaque participant est séparés par une virgule", inline: false },
            { name: '!tirage (Liste)',           value: "Liste : Chaque participant est séparés par une virgule", inline: false },
            { name: '!prolong (Liste) (Match)',  value: "Liste : Chaque participant est séparés par une virgule \n Match : Duel_n°x, Groupe_n°x", inline: false },
            { name: '!podium (Liste) (Nom)',     value: "Liste : Chaque participant est séparés par une virgule \n Nom   : Nom du sondage", inline: false }
        );
    message.channel.send(emb)
}

function liste(cmd,message){

    L = cmd.split(",");

    tour = "Voici les sélectionnés " + Tour.tlt(L.length) + " :"
    couleur = '#44e3e8'

    if (L.length == 2) {
        L1 = L[0].split(";")
        L2 = L[1].split(";")
        emb = new Discord.MessageEmbed()
        .setColor(couleur)
        .setTitle("Voici les sélectionnés des finals :")
        .addFields({ name: "Petite final : ",value: L1[0] + " :vs: " + L1[1], inline: false })
        .addFields({ name: "Grande final : ",value: L2[0] + " :vs: " + L2[1], inline: false })
        message.channel.send(emb)
    }
    else {
        mot = "- " + L[0]
        i = 1;
        while (i < L.length) {
            mot = mot + "\n - " + L[i];
            i++;
        }
        emb = new Discord.MessageEmbed()
        .setColor(couleur)
        .setAuthor(tour)
        .setDescription("**"+mot+"**")
        message.channel.send(emb)
    }

    L = Cmd.scmd(L)
    return L
}

function tirage(cmd,message){

    L = cmd.split(",");
    L = Aleatoire.tab(L);

    tour = "Voici le tirage " + Tour.tlt(L.length) + " :"
    couleur = '#44e3e8'

    if (L.length <= 16) {
        emb = new Discord.MessageEmbed()
        .setColor(couleur)
        .setAuthor(tour)

        t = 1;
        i = 0;
        while (i < L.length) {
            emb.addFields({ name: "Duel n°"+ t +" : ",value: L[i] + " :vs: " + L[i+1], inline: false })
            t = t+1;
            i = i+2;
        }
        message.channel.send(emb)
    }
    else {

        emb = new Discord.MessageEmbed()
        .setColor(couleur)
        .setAuthor(tour)

        t = 1;
        i = 0;
        while (i < L.length) {
            emb.addFields({ name: "Groupe n°"+ t +" : ",value: L[i] + " :vs: " + L[i+1] + " :vs: " + L[i+2] + " :vs: " + L[i+3], inline: false }) 
            t = t+1;
            i = i+4;
        }
        message.channel.send(emb)
    }

    console.log('L:', L)
    L = Cmd.scmd(L)
    return L
}

function start(cmd,message){

    L = cmd.split(",");

    tour = Tour.num(L.length)
    couleur = '#44e3e8'

    if (L.length == 2) {
        L1 = L[0].split(";")
        L2 = L[1].split(";")

        emb = new Discord.MessageEmbed()
        .setColor(couleur)
        .setTitle("Petite final : " +L1[0]+ " :vs: " +L1[1])
        .setDescription("**"+":one: "+ L1[0] +"\n" +":two: "+ L1[1] +"**")
        message.channel.send(emb).then(sentEmbed => {
            sentEmbed.react("1️⃣")
            sentEmbed.react("2️⃣")
        })
        emb = new Discord.MessageEmbed()
        .setColor(couleur)
        .setTitle("Final : " +L2[0]+ " :vs: " +L2[1])
        .setDescription("**"+":one: "+ L2[0] +"\n" +":two: "+ L2[1] +"**")
        message.channel.send(emb).then(sentEmbed => {
            sentEmbed.react("1️⃣")
            sentEmbed.react("2️⃣")
        })
    }
    else if (L.length <= 16) {
        i = 1;
        l = 0;
        while (l < L.length) {
            emb = new Discord.MessageEmbed()
            .setColor(couleur)
            .setTitle(tour +i+ " :                                          ")
            .setDescription("**"+ ":one: " + L[l] +"\n"+ ":two: " + L[l+1] +"**")
            message.channel.send(emb).then(sentEmbed => {
                sentEmbed.react("1️⃣")
                sentEmbed.react("2️⃣")
            })
            i = i+1;
            l = l+2; 
        }
    }
    else {
        i = 1;
        l = 0;
        while (l < L.length) {
            emb = new Discord.MessageEmbed()
            .setColor(couleur)
            .setTitle(tour +i+ " :                                        ")
            .setDescription("**"+ ":one: " + L[l] +"\n"+ ":two: " + L[l+1] +"\n"+ ":three: " + L[l+2] +"\n"+ ":four: " + L[l+3] +"**")
            message.channel.send(emb).then(sentEmbed => {
                sentEmbed.react("1️⃣")
                sentEmbed.react("2️⃣")
                sentEmbed.react("3️⃣")
                sentEmbed.react("4️⃣")
            })
            i = i+1;
            l = l+4; 
        }
    }
}

function prolong(cmd,message){

    L = cmd[1].split(",");

    couleur = '#44e3e8' 

    mot = Numero.num(1) +" "+ L[0]
    i = 1;
    while (i < L.length) {
        mot = mot +"\n"+ Numero.num(i+1) +" "+ L[i]
        i = i+1;
    }
    emb = new Discord.MessageEmbed()
    .setColor(couleur)
    .setTitle("Prolongation "+ cmd[2] +" :")
    .setDescription("**"+ mot +"**")
    message.channel.send(emb).then(sentEmbed => {
        i = 1
        while (i <= L.length) {
            sentEmbed.react(Numero.cap(i))
            i = i+1;
        }
    })
}

function podium(cmd,message){

    L = cmd[1].split(",");

    couleur = '#44e3e8' 

    mot = Numero.med(3) +" "+ L[2] +"\n"+ Numero.med(2) +" "+ L[1] +"\n"+ Numero.med(1) +" "+ L[0] +"\n"

    emb = new Discord.MessageEmbed()
    .setColor(couleur)
    .setTitle('Voici le podium du sondage "'+ cmd[2] +'"')
    .setDescription("**"+ mot +"**")
    message.channel.send(emb).then(sentEmbed => {
        sentEmbed.react("👍")
        sentEmbed.react("👎")
        sentEmbed.react("👏")
    })
}
