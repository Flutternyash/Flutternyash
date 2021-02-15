const {MessageEmbed} = require("discord.js"); // Дописать и оформить.

module.exports = {
  name: "server",
  aliases: ["sr", "cthdth", "сервер", "ыукмук"],
  memberName: "Server",
  description: "Информация по данному серверу.",
  execute(message) {
    let exampleEmbed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("")
      .setURL("")
      .setAuthor(`Инфо "${message.guild.name}"`,
        `${message.author.avatarURL({ format: "png", dynamic: true, size: 2048 })}`,
        "")
      .setDescription("")
      //.setThumbnail(message.author.avatarURL({ format: "png", dynamic: true, size: 2048 }))
      //.setThumbnail("")
      .addFields([
        {
          name: "Учасники:",
          value: `Всего: ${message.guild.memberCount},\n Юзвери: ;\n Боты: ${message.guild.bot}`,
          inline: true
        },
        {
          name: "По статусам:",
          value: `Онлайн:`,
          inline: true
        },
        {
          name: "Создатель:",
          value: `${message.guild.owner}`,
          inline: false
        },
        {
          name: "AFK канал:",
          value: `${message.guild.afkChannel}`,
          inline: false
        },
        {
          name: "Каналы:",
          value: `Всего: ${message.guild.members}`,
          inline: false
        },
        {
          name: "Учасники:",
          value: `Всего: ${message.guild.iconURL}`,
          inline: false
        },
        {
          name: "Учасники:",
          value: `Регион: :flag_eu:${message.guild.region}`,
          inline: false
        },
      ])
      .setImage("")
      .setFooter(`Создан ${message.guild.createdAt} |`)

    message.channel.send(exampleEmbed);
  }
}
