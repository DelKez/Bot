const Discord = require('discord.js');
const client = new Discord.Client();
client.login(process.env.TOKEN);
client.on("ready", () => { });

// APPEL FICHIERS
const Mode = require("./modules/mode")
const Cinema = require("./modules/cinema")

// TOUT
var ID;
var OP = [372062512558113,419925262881260,457240529176887];
var mot = "...";

client.on('message', function (message) {  

    ID = message.member;
    cmd = message.content;

    if (cmd[0] == "!") {

        cmd = message.content.substr(1,100);
        cmd = cmd.split(" ");

        if (OP.indexOf(Math.round(ID / 1000)) >= 0) {

            if (cmd[0] == "mode") {
                mot = Mode.cmd(cmd)
            }
    
            if (Mode.getMode() == "cinéma") {
                mot = Cinema.cmd(cmd);
            }
            message.channel.send(mot)
        }
    }
})

//HEROKU MDP : 4884J$