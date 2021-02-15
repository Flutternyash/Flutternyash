module.exports = {
  name: "prefix",
  aliases: [],
  memberName: "prefix",
  description: "установить префикс",
  execute(message, args) {
    const oldPrefix = message.client.db.settings.selectPrefix.pluck().get(message.guild.id);
    const prefix = args[0];
    if (!prefix) {
      return message.channel.send("argument of command don't specify");
    }
    message.client.db.settings.updatePrefix.run(prefix, message.guild.id);
    message.channel.send(`oldPrefix - ${oldPrefix}\n currentPrefix - ${prefix}`);
  }
};
