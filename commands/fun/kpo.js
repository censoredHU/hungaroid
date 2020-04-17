const { MessageEmbed } = require("discord.js");
const { promptMessage } = require("../../functions.js");

const chooseArr = ["🗻", "📰", "✂"];

module.exports = {
    name: "kpo",
    category: "fun",
    description: "Kő-Papír-Olló játék. Ajd reakciót a hangulatjelek egyikéhez, ha játszani szeretnél!",
    usage: "kpo",
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
            .setColor("f5f474")
            .setFooter(message.guild.me.displayName, client.user.displayAvatarURL())
            .setDescription("Adj reakciót a hangulatjelek egyikéhez, ha játszani akarsz!")
            .setTimestamp();

        const m = await message.channel.send(embed);
        const reacted = await promptMessage(m, message.author, 30, chooseArr);

        const botChoice = chooseArr[Math.floor(Math.random() * chooseArr.length)];

        const result = await getResult(reacted, botChoice);
        await m.reactions.removeAll();

        embed
            .setDescription("")
            .addField(result, `${reacted} vs ${botChoice}`);

        m.edit(embed);


        function getResult(me, clientChosen) {
            if ((me === "🗻" && clientChosen === "✂") ||
                (me === "📰" && clientChosen === "🗻") ||
                (me === "✂" && clientChosen === "📰")) {
                    return "Nyertél!";
            } else if (me === clientChosen) {
                return "Ez bizony egy döntetlen!";
            } else {
                return "Vesztettél!!";
            }
        }
    }
}