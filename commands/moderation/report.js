const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = {
    name:"report",
    category: "moderation",
    description: "Reports a member",
    usage: "<mention | id>",
    run: async (client, message, args) => {
        if (message.deletable) message.delete();

        let rMember = message.mentions.members.first() || message.guild.members.get(args[0]);

        if (!rMember)
            return message.reply("Nem találtam ilyen tagot").then(m => m.delete(5000));

        if (rMember.hasPermission("BAN_MEMBERS") || rMember.user.bot)
            return message.reply("Nem tudod jelenteni ezt a tagot").then(m => m.delete(5000));

        if (!args[1])
            return message.channel.send("Kérlek írj egy okot a jelentéshez!").then(m => m.delete(5000));

        const channel = message.guild.channels.cache.find(channel => channel.name === "reports");

        if (!channel)
            return message.channel.send("Nem találtam #reports nevű csatornát").then(m => m.delete(5000));

        const embed = new MessageEmbed()
            .setColor("#ff0000")
            .setTimestamp()
            .setFooter(message.guild.name, message.guild.iconURL)
            .setAuthor("Jelentett tag", rMember.user.displayAvatarURL)
            .setDescription(stripIndents`**> Tag:** ${rMember} (${rMember.id})
            **> Jelentő:** ${message.member} (${message.member.id})
            **> Itt lett jelentve:** ${message.channel}
            **> Oka:** ${args.slice(1).join(" ")}`)
    
        return channel.send(embed);
    }
}