module.exports = {
    name: "clear",
    aliases: ["purge", "nuke"],
    category: "moderation",
    description: "Clears the chat",
    run: async (client, message, args) => { 
        
        // Member doesn't have permissions
        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            return message.reply("Nem tudsz üzeneket törölni ezen a szerveren.").then(m => m.delete(5000));
        
        }



        // Check if args[0] is a number

        if (isNaN(args[0]) || parseInt(args[0]) <= 0) {

            return message.reply("Yeah.... Nem tudok 0 üzenetet kitörölni.").then(m => m.delete(5000));

        }



        // Maybe the bot can't delete messages

        if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {

            return message.reply("Bocsi... Nem tudok üzeneteket törölni.").then(m => m.delete(5000));

        }



        let deleteAmount;



        if (parseInt(args[0]) > 100) {

            deleteAmount = 100;

        } else {

            deleteAmount = parseInt(args[0]);

        }



        message.channel.bulkDelete(deleteAmount, true)

            .then(deleted => message.channel.send(`\`${deleted.size}\` üzenetet töröltem.`))

            .catch(err => message.reply(`Something went wrong... ${err}`));

    }

}