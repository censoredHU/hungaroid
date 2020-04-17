const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

const Client = require("fortnite");
const ft = new Client(process.env.FORTNITE);

module.exports = {
    name: "fortnite",
    aliases: ["ft"],
    description: "Display someone's stats, the current store, and challenges!!",
    usage: "<username | store>",
    run: async (client, message, args) => {
        const platforms = ["pc", "xb1", "psn"];
    
        if (args[0].toLowerCase() === "store") {

            

        } else {

            // Get the last word from the args array

            const lastWord = args[args.length - 1].toLowerCase();

            

            // Declare variables so we can use them later

            let platform, username; 



            // If the platforms array includes the last word we provided

            if (platforms.includes(lastWord)) {

                // Make the username untill the last word

                username = args.slice(0, args.length - 1).join(" ");

                // Make the platform the last word  

                platform = lastWord;

            } else {    

                // Make the username all words

                username = args.join(" ");

                // Platform defaults to PC

                platform = "pc";

            }

            

            // Search the user 

            const search = await ft.user(username, platform);



            // If the user isn't found

            if (!search.username) {

                return message.channel.send("Nem találtam meg, próbáld újra")

                    .then(m => m.delete(5000));

            }



            // Declare stuffs for easier access

            const lifetime = search.stats.lifetime;

            const solo = search.stats.solo;

            const duo = search.stats.duo;

            const squad = search.stats.squad;



            const embed = new MessageEmbed()

                .setTitle(`${search.username} (${search.platform})`)

                .setURL(search.url)

                .setColor("#9d4dbb")

                .setFooter(`Fortnite stats`, message.author.displayAvatarURL())

                .setTimestamp()

                .addField("Solo:", stripIndents`**- Győzelem:** ${solo.wins}

                **- KD:** ${solo.kd}

                **- Ölések:** ${solo.kills}

                **- Ölések meccsenként:** ${solo.kills_per_match}`, true)

                .addField("Duo:", stripIndents`**- Győzelem:** ${duo.wins}

                **- KD:** ${duo.kd}

                **- Ölések:** ${duo.kills}

                **- Ölések meccsenként:** ${duo.kills_per_match}`, true)

                .addField("Squad:", stripIndents`**- Győzelmek:** ${squad.wins}

                **- KD:** ${squad.kd}

                **- Ölések:** ${squad.kills}

                **- Ölések meccsenként:** ${squad.kills_per_match}`, true)

                .addField("Összesen:", stripIndents`**- Győzelmek:** ${lifetime.wins}

                **- KD:** ${lifetime.kd}

                **- Ölések:** ${lifetime.kills}`, false)



            message.channel.send(embed)

        }

    }

}