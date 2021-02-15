const {MessageEmbed} = require("discord.js");

module.exports = {
  info: {
    name: "loop",
    aliases:["повтор", "повтори"],
    description: "Toggle music loop",
    usage: "loop",
    async execute(client, message, args) {
      const serverQueue = message.client.queue.get(message.guild.id);
      if (serverQueue) {
        serverQueue.loop = !serverQueue.loop;
        return message.channel.send({
          embed: {
            color: "GREEN",
            description: `🔁  **|**  Loop is **\`${serverQueue.loop === true ? "enabled" : "disabled"}\`**`
          }
        });
      }
      return message.channel.send("There is nothing playing in this server.", message.channel);
    }
  }
}