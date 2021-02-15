module.exports = { //Починить отправку одной строкой.
  name: "say",
  aliases: [],
  memberName: "say | Скажи",
  description: "say",

  execute(message, args) {
    message.channel.send("I'm bot");
  }
};
