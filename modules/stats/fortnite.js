// APPEL FICHIERS
const Discord = require('discord.js'); 
const Fortnite = require("../../node_modules/fortnite/index"); //383deeb6-62fd-487a-8d92-afdcc9643cc3
const fortnite = new Fortnite("383deeb6-62fd-487a-8d92-afdcc9643cc3");

module.exports.cmd = function (cmd,client) {

    let fortniteChannel = client.channels.cache.get("707069569788936277")

    username = cmd[0];
    platform = cmd[1] || "pc";

    data = fortnite.user(username,platform).then(data => {

        console.log('data:', data)

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

        if (fortniteChannel) {
            fortniteChannel.send(emb)
        }
    })
}
