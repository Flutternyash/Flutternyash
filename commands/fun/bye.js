module.exports = {
  name: "bye",
  aliases: ["бб", "bb", "пака", "пока", "прощай", "ghjofq", "gjrf", "ину", "goodbye", "пщщвину"],
  memberName: "Bye | Пока",
  description: "Попрощайся, будь вежливым блеадь! Пожалуйста.",

  execute(message) {
    message.channel.startTyping();
    setTimeout(() => {
      message.channel.send("Уёбывай давай!").then();
      message.channel.send("", {
        files: [
          "./.content/img/yebivay.jpg"
        ]
      }).then();
      message.channel.stopTyping();
    }, 1000);

    message.channel.startTyping(3);
    setTimeout(() => {
      message.channel.send('Гнида.')
    }, 3000);
    setTimeout(() => {
      message.channel.stopTyping(true);
    });
  }
};
