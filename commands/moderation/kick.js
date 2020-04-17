const { MessageEmbed } = require("discord.js")
const { stripIndents } = require("common-tags");
const { promptMessage } = require("../../functions.js");

module.exports = {
    name: "kick",
    category: "moderation",
    description: "Kicks the member",
    usage: "<id | mention>",
    run: async (client, message, args) => {
        const logChannel = message.guild.channels.cache.find(c => c.name === "logs") || message.channel;
    
        if (message.deletable) message.delete();        
    
        // No args
        if (!args[0]) {
            return message.reply("Kérlek jelöld meg a tagot")
                .then(m => m.delete(5000));
        }

        // No reason
        if (!args[1]) {
            return message.reply("Kérlek adj meg egy okot")
                .then(m => m.delete(5000));
        }

        // No author permissions
        if (!message.member.hasPermission("KICK_MEMBERS")) {
            return message.reply("❌ Nincs jogod ahhoz, hogy kickelj tagokat")
                .then(m => m.delete(5000));
        }

        // No bot permissions
        if (!message.guild.me.hasPermission("KICK_MEMBERS")) {
            return message.reply("❌ Nincsen jogom tagok kickeléséhez")
                .then(m => m.delete(5000));
        }

        const toKick = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        // No members found
        if (!toKick) {
            return message.reply("Nem találtam meg a tagot, próbáld újra!")
                .then(m => m.delete(5000));
        }

        // Can't kick yourself
        if(message.author.id === toKick.id) {
            return message.reply("Nem kickelheted ki magadat")
                .then(m => m.delete(5000));
        }

        // Kickable
        if (!toKick.kickable) {
            return message.reply("Nem tudom kickelni a tagot a rang elrendezés miatt.")
                .then(m => m.delete(5000));
        }

        const embed = new MessageEmbed()
            .setColor("#ff0000")
            .setThumbnail(toKick.user.displayAvatarURL())
            .setFooter(message.member.displayName, message.author.displayAvatarURL())
            .setTimestamp()
            .setDescription(stripIndents`**> Kirúgott tag:** ${toKick} (${toKick.id}))
            **> Kirúgva általa:** ${message.author} (${message.author.id})
            **> Oka:** ${args.slice(1).join(" ")}`);

        const promptEmbed = new MessageEmbed()
            .setColor("GREEN")
            .setAuthor("Ez a megerősítés 30 mp múlva érvénytelenné válik.")
            .setDescription(`Kickelni akarod: ${toKick}?`);

        message.channel.send(promptEmbed).then(async msg => {
            const emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);

            if (emoji === "✅") {
                msg.delete();

                toKick.kick(args.slice(1).join(" "))
                    .catch(err => {
                        if (err) return message.channel.send(`Nos, valami rosszul ment?`);
                    });
            
                logChannel.send(embed);
            } else if (emoji === "❌") {
                msg.delete();

                message.reply("Kick visszavonva...")
                    .then(m => m.delete(5000));
            }
        });
    }
}