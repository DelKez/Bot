// APPEL FICHIERS
const Discord = require('discord.js'); 
const Mode = require('./mode'); 

module.exports.cmd = function(cmd,client,message,ID){
    if (cmd[0] == "!help"){
        help(message);
    }
}

function help(message){    

    emb = new Discord.MessageEmbed()
        .setColor('#44e3e8')
        .setAuthor("Cmd Robot :","https://icon-library.com/images/white-gear-icon-png/white-gear-icon-png-12.jpg")
        .addFields(
            { name: '!(Mode)'   , value: "Mode : robot, sondage, cinema, stats", inline: false },
            { name: '!mode?'    , value: "Affiche le mode paramétré du bot"    , inline: false },
            { name: '!help'     , value: "Affiche les commandes du mode actuel", inline: false },
        );
    message.channel.send(emb)
}