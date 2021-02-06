// APPEL FICHIERS
const Token = require("./token.json")
const Mode = require("./modules/mode")
const Cinema = require("./modules/cinema")
const Sondage = require("./modules/sondage")
const Stats = require("./modules/sondage")

const Date = require("./tool/date")
const Numero = require("./tool/numero")
const Cmd = require("./tool/cmd")

// CONNEXION DISCORD
const Discord = require('discord.js'); 
const client = new Discord.Client();
client.login(process.env.TOKEN);
client.on("ready", () => { });

// VARIABLES
var date = Date.date();
var H = true;
var ID;
var OP = [372062512558113,419925262881260,457240529176887]; 
var mot = "...";

// Horloge interne
function horloge () {
    console.log('date:', date);
    if (date != Date.date()) {
        date = Date.date();
        prive('372062512558112780',"Bonjour nous sommes le " + date)
    }
    setTimeout(horloge,90000);
}
horloge();
// Messages privés
function prive (ID,msg){
    client.users.fetch(ID).then((user) => {
        user.send(msg)
       }) 
}

// Détéction des messages
client.on('message', function (message) {  

    ID = message.member;
    cmd = message.content;
    
    if (cmd[0] == "!") {

        cmd = Cmd.cmd(cmd)
        
        if (OP.indexOf(Math.round(ID / 1000)) >= 0) {

            if (cmd[0] == "!mode") {
                mot = Mode.cmd(cmd);
            }
    
            else if (Mode.getMode() == "cinéma") {
                mot = Cinema.cmd(cmd);
            }

            else if (Mode.getMode() == "sondage") {
                mot = Sondage.cmd(cmd);
            }

            else if (Mode.getMode() == "stats") {
                mot = Stats.cmd(cmd);
            }

            else {
                mot = "...";
            }
            message.delete();
            message.channel.send(mot)
            console.log('mot:', mot)
        }
    }
})

//HEROKU MDP : As usual
