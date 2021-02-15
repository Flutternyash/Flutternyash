const { MessageEmbed } = require("discord.js")

module.exports = async (text, channel) => {
  let embed = new MessageEmbed()
    .setColor("RED")
    .setDescription(text)
    .setFooter("Та ты шо нахуй, а шо такое? Поломалось, сука?")
  await channel.send(embed)
}