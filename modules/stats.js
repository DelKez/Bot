// APPEL FICHIERS
const Discord = require('discord.js'); 
const Fortnite = require('./stats/fortnite');

module.exports.cmd = function(cmd,client,message,ID){

    if (cmd[0] == "!help"){
        help(message);
    }
    else if (cmd[0] == "!ft"){
        Fortnite.cmd(cmd,client,ID);
    }
}

function help(message){    

    emb = new Discord.MessageEmbed()
        .setColor('#44e3e8')
        .setAuthor("Cmd Stats :","https://icon-library.com/images/white-gear-icon-png/white-gear-icon-png-12.jpg")
        .addFields(
            { name: '!(Jeu) (Pseudo) (Platforme)', value: "Jeu : ft | Platforme : pc, psn, xbl", inline: false },
            { name: '!(Jeu) tlm'                 , value: "Jeu : ft"                           , inline: false },
            { name: '!(Jeu)'                     , value: "Jeu : ft"                           , inline: false },
        );
    message.channel.send(emb)
}