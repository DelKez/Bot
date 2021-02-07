// APPEL FICHIERS
const Discord = require('discord.js'); 
const Mode = require("./modules/mode")
const Cinema = require("./modules/cinema")
const Sondage = require("./modules/sondage")
const Stats = require("./modules/stats")

const Cmd = require("./tool/cmd")
const Date = require("./tool/date")
const Heure = require("./tool/heure")
const Evenement = require("./tool/evenement")
//const Prive = require("./tool/prive")
const Numero = require("./tool/numero")

const Member = require("./member.json")

// CONNEXION DISCORD
const client = new Discord.Client();
client.login(process.env.TOKEN);
client.on("ready", () => { });

// VARIABLES
var date = Date.date();
var heure = Heure.heure();
var evenements = ["fortnite"]
var ID;
var OP = Member["OP"];
console.log('OP:', OP)
var mot = "...";

// Horloge interne
function horloge () {
    heure = Heure.heure();
    if (heure == '08:30') {
        date = Date.date();
        prive('372062512558112780',"Bonjour nous sommes le " + date)
    }
    if (heure == '15:30') {
        Evenement.cmd(evenements,client);
    }
    setTimeout(horloge,60000);
}
//horloge();

//Evenement.cmd(evenements,client);


// Messages privés
function prive(ID,msg){
    client.users.fetch(ID).then((user) => {
        user.send(msg)
       }) 
}


// Détéction des messages
client.on('message', function (message) {  

    ID = message.member.id;
    cmd = message.content;
    
    if (cmd[0] == "!") {

        cmd = Cmd.cmd(cmd)
        console.log('cmd index.js:', cmd)

        console.log('ID:', ID)
        
        if (OP.indexOf(ID) >= 0) {
            
            message.delete();
            if (cmd[0] == "!mode") {
                mot = Mode.cmd(cmd);
                message.channel.send(mot)
            }
            else if (Mode.getMode() == "cinéma") {
                mot = Cinema.cmd(cmd);
                message.channel.send(mot)
            }
            else if (Mode.getMode() == "sondage") {
                mot = Sondage.cmd(cmd);
                message.channel.send(mot)
            }
            else if (Mode.getMode() == "stats") {
                mot = Stats.cmd(cmd,client);
            }
            else  {
                mot = "...";
            }
        }
    }
})

//HEROKU MDP : As usual
