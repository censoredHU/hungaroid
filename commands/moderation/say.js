const { MessageEmbed } = require("discord.js");

module.exports = {

    name: "say",

    aliases: ["bc", "broadcast"],

    category: "moderation",

    description: "Says your input via the bot",

    usage: "<input>",

    run: (client, message, args) => {
        if (message.deletable) message.delete();

        if (args.length < 1)
            return message.reply("Nincs mit mondanod?").then(m => m.delete(5000));

        const roleColor = message.guild.me.displayHexColor === "#000000" ? "#ffffff" : message.guild.me.displayHexColor;

        if (args[0].toLowerCase() === "embed") {
            const embed = new MessageEmbed()
                .setColor(roleColor)
                .setDescription(args.slice(1).join(" "))
                .setTimestamp()
                .setImage(client.user.displayAvatarURL())
                .setAuthor(message.author.name, message.author.displayAvatarURL())
                .setFooter(client.user.username, client.user.displayAvatarURL());

            message.channel.send(embed);
        } else {
            message.channel.send(args.join(" "));
        }
    }
}