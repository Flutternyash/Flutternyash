const {MessageEmbed} = require("discord.js"); // Дописать и оформить.

module.exports = {
  name: "help",
  aliases: ["h", "gjvjo", "[tkg", "хелп", "помощь", "помоги", "рудз", "р", "gjvjub"],
  memberName: "Help | Помоги",
  description: "Помощь даунам.",

  execute(message, client) {
    let commands = message.client.commands.array();
    let Embed = new MessageEmbed()
      //.setAuthor(`${client.user.username}`, `${client.user.avatar}`)
      .setTitle("ПОМОЩЬ ДАУНАМ")
      .setDescription("Список доступных команд.")
      .setThumbnail("https://cdn.discordapp.com/attachments/783122032996122656/806155847608172564/1.gif")
      .setColor("#ff8325")
      .setFooter("Хей-гей-ге-ей!");

    commands.filter((comm) => {
      if ((comm.name === "help") || (comm.name === "ko-ko")){
        return;
      }
      Embed.addField(
        `🔸${message.client.prefix}${comm.memberName}:`, `${comm.description}`,
        false
      );
    });
    return message.channel.send(Embed);
  }
};