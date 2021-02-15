const {MessageEmbed} = require("discord.js"); // Дописать и оформить.

module.exports = {
  name: "kick",
  aliases: ["kk", "rbryb", "кикни", "лшсл"],
  memberPermissions: ["KICK_MEMBERS"],
  memberName: "Kick",
  description: "Кикнуть юзверя нахОй с сервера.",

  execute(message, args) {
    const user = message.mentions.users.first();
    let reason = args.slice(1).join(" ");
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        member
          .kick(`"${reason}". Кикнул: ${message.author}.`)
          .then(() => {
            message.reply(` успешно послан нахуй ${user.tag}`);
          })
          .catch(err => {
            message.reply('I was unable to kick the member');
            console.error(err);
          });
      } else {
        message.reply("That user isn't in this guild!");
      }
    } else {
      message.reply("You didn't mention the user to kick!");
    }
  }
}

