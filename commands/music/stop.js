const {MessageEmbed} = require("discord.js");

module.exports = {
  name: "stop",
  description: "To stop the music and clearing the queue",
  usage: "",
  aliases: [],
  async execute(client, message, args) {
    const channel = message.member.voice.channel
    if (!channel) return message.send("I'm sorry but you need to be in a voice channel to play music!", message.channel);
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return message.send("There is nothing playing that I could stop for you.", message.channel);
    if (!serverQueue.connection) return
    if (!serverQueue.connection.dispatcher) return
    try {
      serverQueue.connection.dispatcher.end();
    } catch (error) {
      message.guild.me.voice.channel.leave();
      message.client.queue.delete(message.guild.id);
      return message.send(`:notes: The player has stopped and the queue has been cleared.: ${error}`, message.channel);
    }
    message.client.queue.delete(message.guild.id);
    serverQueue.songs = [];
    message.react("✅")
  },
};