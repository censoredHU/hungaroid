module.exports = {
    name: "ping",
    category: "info",
    description: "Returns latency and API ping",
    run: async (client, message, args) => {
        const msg = await message.channel.send(`🏓 Ping...`);

        msg.edit(`🏓 Pong!\nKésleltetésed ${Math.floor(msg.createdAt - message.createdAt)}ms`);
    }
}