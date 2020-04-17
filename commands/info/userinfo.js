const { getMember, formatDate } = require("../../functions.js");
const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = {
    name: "userinfo",
    aliases: ["who", "user", "info"],
    category: "info",
    description: "Returns user information",
    usage: "[username | id | mention]",
    run: async (client, message, args) => {
        const member = getMember(message, args.join(" "));
   
        //Member variables
        const joined = formatDate(member.joinedAt);
        const roles = member.roles
            .cache.filter(r => r.id !== message.guild.id)
            .map(r => r)
            .join(", ") || "none";

        // User variables
        const created = formatDate(member.user.createdAt);

        const embed = new MessageEmbed()
            .setFooter(member.displayName, member.user.displayAvatarURL())
            .setThumbnail(member.user.displayAvatarURL())
            .setColor(member.displayHexColor === "#000000" ? "#ffffff" : member.displayHexColor)
        

            .addField('Tag információk', stripIndents`**> Név:** ${member.displayName}
            **> A szerverhez ekkor csatlakozott:** ${joined}
            **> Rangok:** ${roles}`, true)
            
            .addField('Felhasználó információk', stripIndents`**> ID:** ${member.user.id}
            **> Név:** ${member.user.username}
            **> Discord Tag:** ${member.user.tag}
            **> Létrehozva:** ${created}`, true)
            
            .setTimestamp()

            message.channel.send(embed);
    }
}