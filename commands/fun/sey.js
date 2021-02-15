
module.exports = { //Починить отправку одной строкой.
  name: "sey",
  aliases: ["crf;b", "cgbplfyb", "ukfujkm", "скажи", "спиздани", "глаголь"],
  memberName: "Sey | Скажи",
  description: "Конечно я блять повторю то что ты высрал, не сомнивайся.",

  execute(message, args) {
    let botsey = args = message.content.split(" ");
    args.shift();
    args = args.join(" ");

    message.delete().catch();
    message.channel.send(botsey).then(message.channel.send(message.author))
  }
}
