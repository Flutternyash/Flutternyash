const {MessageEmbed} = require("discord.js"); // Дописать и оформить.

module.exports = {
  name: "ban",
  aliases: ["бан", "забань"],
  memberPermissions: ["BAN_MEMBERS"],
  memberName: "ban",
  description: "забанить",

  execute(message, args) {
    const user = message.mentions.users.first();
    let reason = args.slice(1).join(" ");
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        member
          .ban({reason: `"${reason}". Забанил: ${message.author}.`})
          .then(() => {
            message.reply(`Successfully banned ${user.tag}`);
          })
          .catch(err => {
            message.reply('I was unable to ban the member');
            console.error(err);
          });
      } else {
        message.reply("That user isn't in this guild!");
      }
    } else {
      message.reply("You didn't mention the user to ban!");
    }
  }
}