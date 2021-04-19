// APPEL FICHIERS
const Discord = require('discord.js'); 
const Mode = require("./modules/mode")
const Robot = require("./modules/robot")
const Cinema = require("./modules/cinema")
const Sondage = require("./modules/sondage")
const Stats = require("./modules/stats")

const Cmd = require("./tool/cmd")
const Date = require("./tool/date")
const Heure = require("./tool/heure")
const Evenement = require("./tool/evenement")
const Numero = require("./tool/numero")
const Membre = require("./membre")

// CONNEXION DISCORD
const client = new Discord.Client();
client.login(process.env.TOKEN)
client.on("ready", () => { });

// VARIABLES
var date = Date.date();
var heure = Heure.heure();
var ID;
var OP = Membre["OP"];
var mot = "...";

// Détéction des messages
client.on('message', function (message) { 
    cmd = message.content
    
    if (cmd[0] == "!") {
        
        ID = message.member.id

        cmd = Cmd.cmd(cmd)
        console.log('cmd index.js:', cmd)
        console.log('ID:', ID)
        
        if (OP.indexOf(ID) >= 0) {
            message.delete();
            if (cmd[0] == "!mode") {
                mot = Mode.cmd(cmd);
                message.channel.send(mot)
            }
            else if (cmd[0] == "!mode?"){
                message.channel.send("Je suis en mode " + Mode.getMode() + " !")
            }
            else if (Mode.getMode() == "robot") {
                mot = Robot.cmd(cmd,message);
            }
            else if (Mode.getMode() == "cinéma") {
                mot = Cinema.cmd(cmd);
                message.channel.send(mot)
            }
            else if (Mode.getMode() == "sondage") {
                Sondage.cmd(cmd,message);
            }
            else if (Mode.getMode() == "stats") {
                Stats.cmd(cmd,client,message,ID);
            }
        }
    }
})

// Messages privés temp
function prive(ID,msg){
        client.users.fetch(ID).then((user) => {
            user.send(msg)
        }) 
}

// Horloge interne
function horloge () {
    heure = Heure.heure()
    if (heure == '08:30') {
        date = Date.date();
        prive('372062512558112780',"Bonjour, on est "+ date[0] +" et nous sommes le " + date[1])
    }
    if (heure == '15:30') {
        Evenement.cmd('fortnite',client)
    }
    setTimeout(horloge,60000)
}
horloge()
