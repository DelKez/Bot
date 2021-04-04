// APPEL FICHIERS
const Discord = require('discord.js'); 
const Fortnite = require("./fortnite/index"); //383deeb6-62fd-487a-8d92-afdcc9643cc3
const fortnite = new Fortnite("383deeb6-62fd-487a-8d92-afdcc9643cc3");
const Joueurs = require("./joueurs")

module.exports.cmd = function (cmd,client,ID) {

    if (cmd.length == 1){
        trouveJoueur(client,ID)
    } 
    else if (cmd[1] == "tlm"){
        joueurs(client)
    }
    else {
        joueur([cmd[1],cmd[2]],client)
    }
}

function trouveJoueur(client,ID) {
    i = 0;
    while (i<Joueurs["fortnite"].length) {
        if (Joueurs['fortnite'][i][2] == ID.toString()) {
            joueur(Joueurs['fortnite'][i],client)
            break
        }
        i++;
    }
}

function joueurs(client) {
    i = 0;
    while (i<Joueurs["fortnite"].length) {
        joueur(Joueurs['fortnite'][i],client)
        i++;
    }
}

function joueur(cmd,client) {

    let Channel = client.channels.cache.get("707069569788936277")

    username = cmd[0];
    platform = cmd[1] || "pc";

    data = fortnite.user(username,platform).then(data => {

        pseudo = data.username;
        top1 = data.stats.lifetime.wins;
        kills = data.stats.lifetime.kills;
        ratio = data.stats.lifetime.kd;
        match = data.stats.lifetime.matches;
        
        emb = new Discord.MessageEmbed()
        .setColor('#761fa1')
        .setAuthor(pseudo +' '+ '('+platform.toUpperCase()+')','https://i.imgur.com/13RZOhj.gif')
        .addFields(
            { name: 'Top 1 :     ', value: top1, inline: true },
            { name: 'Kills :     ', value: kills, inline: true },
            { name: 'Ratio :     ', value: ratio, inline: true },
            { name: 'Match :     ', value: match, inline: true },
        );
        if (Channel) {
            Channel.send(emb)
        }
    }).catch(e => {
        console.log(e);
        Channel.send(username+" n'existe pas sur "+platform.toUpperCase())
    });
}