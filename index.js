// APPEL FICHIERS
const Discord = require('discord.js'); 
const Mode = require("./modules/mode")
const Robot = require("./modules/robot")
const Cinema = require("./modules/cinema")
const Sondage = require("./modules/sondage")
const Stats = require("./modules/stats")

const Cmd = require("./tool/cmd")
const Horloge = require("./tool/horloge")
const Prive = require("./tool/prive")
const Evenement = require("./tool/evenement")

const Membre = require("./membre")

// CONNEXION DISCORD
const client = new Discord.Client();
client.login(process.env.TOKEN)
client.on("ready", () => { });

// VARIABLES
var ID;
var OP = Membre["OP"];
var mot = "...";

// Détéction des messages
client.on('message', function (message) { 
    cmd = message.content
    
    if (cmd[0] == "!") {
        
        ID = message.member.id
        user = message.author.username

        cmd = Cmd.cmd(cmd)
        console.log(user,': ', cmd)
        
        if (OP.indexOf(ID) >= 0) {
            message.delete();
            if (cmd[0] == "!mode") {
                mot = Mode.cmd(cmd);
                message.channel.send(mot)
            }
            else if (cmd[0] == "!mode?"){
                message.channel.send("Je suis en mode " + Mode.getMode() + " !")
            }
            else if (cmd[0] == "!test"){
                message.channel.send("Nous sommes " + Horloge.jour() +", le "+ Horloge.date() +" et il est "+ Horloge.heure())
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

// Horloge interne
function horloge () {
    date = Horloge.date();
    jour = Horloge.jour();
    heure = Horloge.heure();

    if (heure.startsWith('07:3')) {
        msg = "Nous sommes " + jour +", le "+ date +" et il est "+ heure
        Prive.msg(client,'372062512558112780',msg)
    }
    if (heure.startsWith('15:3')) {
        if (jour == "Lundi") {
            Evenement.cmd('fortnite',client)
        }
    }
    setTimeout(horloge,600000) //10min
}
setTimeout(horloge,5000) //5sec
