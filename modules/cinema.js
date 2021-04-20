// APPEL FICHIERS
const Discord = require('discord.js'); 

module.exports.cmd = function (cmd,message){
    if (cmd[0] == "!help"){
        help()
    }
    else if (cmd[0] == "!seance"){
        start(cmd)
    }
}

function help(message){    

    emb = new Discord.MessageEmbed()
        .setColor('#44e3e8')
        .setAuthor("Cmd Sondage :","https://icon-library.com/images/white-gear-icon-png/white-gear-icon-png-12.jpg")
        .addFields(
            { name: '!rien',           value: "ça fait rien", inline: false },
        );
    message.channel.send(emb)
}

function start(cmd){

}