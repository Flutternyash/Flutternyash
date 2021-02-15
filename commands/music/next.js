const {MessageEmbed} = require("discord.js");

module.exports = {
  name: "next",
  aliases: ["скип", "скипни", "некст", "нехт", "дальше", "следующий", "skip", "crbg", "ytrcn", "yt[n", "lfkmit", "cktle.obq", "ылшз", "ьуче"],
  memberName: "Next",
  description: "To skip the current music",
  async execute(message) {
    const channel = message.member.voice.channel;
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!channel)message.send("https://cdn.discordapp.com/attachments/783122032996122656/791375382800629820/chto.jpg");
    if (!serverQueue.connection) return
    if (!serverQueue.connection.dispatcher) return
    if (serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume();
      let thing = new MessageEmbed()
        .setDescription("▶ Resumed the music for you!")
        .setColor("YELLOW")
        .setTitle("Music has been Resumed!")
      return message.channel.send(thing).catch(err => console.log(err));
    }
    try {
      serverQueue.connection.dispatcher.end()
    } catch (error) {
      serverQueue.voiceChannel.leave()
      message.client.queue.delete(message.guild.id);
      message.reply(`:notes: The player has stopped and the queue has been cleared.: ${error}`, message.channel);
      await message.react("✅")
    }
  },
};