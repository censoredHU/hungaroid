const { MessageEmbed } = require("discord.js");
const randomPuppy = require("random-puppy");

module.exports = {
    name: "meme",
    category: "fun",
    description: "Sends an epic meme",
    run: async (client, message, args) => {
        const subReddits = ["FostTalicska"];
        const random = subReddits[Math.floor(Math.random() * subReddits.length)];
        
        const img = await randomPuppy(random);
        const embed = new MessageEmbed()
            .setColor("#ff5700")
            .setImage(img)
            .setTitle(`From /r/FostTalicska`)
            .setURL(`https://reddit.com/r/FostTalicska`);

        message.channel.send(embed);
    }
}