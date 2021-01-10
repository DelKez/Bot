const Discord = require('discord.js');
const client = new Discord.Client();
client.login(process.env.TOKEN);
client.on("ready", () => { });

// APPEL FICHIERS
const Mode = require("./modules/mode")
const Cinema = require("./modules/cinema")
const Date = require("./tool/date")
const Numero = require("./tool/numero")
const Cmd = require("./tool/cmd")

// TOUT
var ID;
var OP = [372062512558113,419925262881260,457240529176887];
var mot = "...";

client.on('message', function (message) {  

    ID = message.member;
    cmd = message.content;
    message.delete();

    if (cmd[0] == "!") {

        cmd = Cmd.cmd(cmd)
        
        if (OP.indexOf(Math.round(ID / 1000)) >= 0) {

            if (cmd[0] == "!mode") {
                mot = Mode.cmd(cmd);
            }
    
            else if (Mode.getMode() == "cinéma") {
                mot = Cinema.cmd(cmd);
            }

            else {
                mot = "...";
            }
            message.channel.send(mot)
        }
    }
})
//HEROKU MDP : 46----64Jj