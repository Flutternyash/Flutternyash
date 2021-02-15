// Фулл оформленная и рабочая команда.

const fs = require("fs");
const Discord = require("discord.js");
const images = fs.readdirSync("./.content/img/privet/");

module.exports = {
  name: "hello",
  aliases: ["здравствуй", "приветствую", "привет", "здарова", "дарова", "руддщ"/*hello*/, "plhfdcndeq"/*здравствуй*/,
    "ghbdtncnde."/*привествую*/, "ghbdtn"/*привет*/, "plfhjdf"/*здарова*/, "lfhjdf"/*дарова*/],
  memberName: "Hello | Привет",
  description: "Поздоровайся блять!",

  execute(message) {
    const file = images[Math.floor(Math.random() * images.length)];
    const attachment = new Discord.MessageAttachment(`./.content/img/privet/${file}`, file);
    message.channel.startTyping();
    setTimeout(() => {
      message.channel.send(attachment)
      message.channel.stopTyping();
    }, 1000);
  }
}
